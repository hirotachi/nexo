<?php

namespace App\controllers;

use App\Core\Request;
use App\middleware\Auth;
use App\models\Article;
use App\models\ArticleTopic;
use App\models\Section;
use App\models\Topic;
use App\models\User;
use Symfony\Component\HttpFoundation\Response;

class ArticlesController
{

	private Article $articleModel;
	protected Topic $topicModel;
	private ArticleTopic $articleTopicModel;
	private Section $sectionModel;
	private User $userModel;

	public function __construct(
		Article $articleModel,
		Topic $topicModel,
		ArticleTopic $articleTopicModel,
		Section $sectionModel,
		User $userModel

	) {
		$this->articleModel = $articleModel;
		$this->topicModel = $topicModel;
		$this->articleTopicModel = $articleTopicModel;
		$this->sectionModel = $sectionModel;
		$this->userModel = $userModel;
	}

	public function create(Request $request)
	{
		$validated = $request->verify([
			"title" => "required",
			"summary" => "nullable",
			"sectionId" => "required|numeric",
			"content" => "nullable",
			"topics" => "array",
			"topics.*" => "nullable",
			"preview" => "required"
		]);
		$topics = $validated["topics"] ?? null;
		unset($validated["topics"]);

		$article = $this->articleModel->create([...$validated, "authorId" => Auth::user()->id]);
		if ($topics) {
			$this->syncTopics($topics, $article->id);
		}
		return ["message" => "success", "article" => $article];
	}

	public function update(Request $request)
	{
		$validated = $request->verify([
			"title" => "required",
			"summary" => "nullable",
			"sectionId" => "required|numeric",
			"content" => "nullable",
			"topics" => "array",
			"topics.*" => "nullable",
			"preview" => "required"
		]);
		$article = $this->articleModel->findByID($request->attributes->get("id"));
		if (!$article) {
			return response(["message" => "Article not found"], Response::HTTP_NOT_FOUND);
		}
		if ($article->authorId !== Auth::user()->id && Auth::user()->role !== "admin") {
			return response(["message" => "Unauthorized, requires Author permissions."],
				Response::HTTP_UNAUTHORIZED);
		}
		$topics = $validated["topics"] ?? null;
		unset($validated["topics"]);
		$updates = [...((array) $article), ...$validated];
		$this->articleModel->updateByID($article->id, $updates);
		if ($topics) {
			$this->syncTopics($topics, $article->id);
		}
		return ["message" => "success"];
	}

	public function delete(Request $request)
	{
		$article = $this->articleModel->findByID($request->attributes->get("id"));
		if (!$article) {
			return response(["message" => "Article not found"], Response::HTTP_NOT_FOUND);
		}
		if ($article->authorId !== Auth::user()->id && Auth::user()->role !== "admin") {
			return response(["message" => "Unauthorized, requires Author permissions."],
				Response::HTTP_UNAUTHORIZED);
		}
		$this->articleModel->delete($article->id);
		return ["message" => "success"];
	}

	public function all(Request $request)
	{
		$page = $request->query->get("page") ?? 1;
		$section = $request->query->get("section") ?? null;
		$topics = $request->query->get("topics") ?? null;
		$query = $request->query->get("query") ?? null;
		$topicsIds = [];
		$sectionId = null;
		if ($section) {
			$sectionId = $this->sectionModel->findOne("name = :name", ["name" => $section])->id;
		}
		if ($topics) {
			$topics = explode(",", $topics);
			$topicsIds = array_map(function ($topic) {
				return $topic->id;
			}, $this->topicModel->findAllIn("name", $topics));
		}
		$filter = [];
		$placeholders = [];

		if (count($topicsIds) > 0) {
			$articlesIds = array_map(function ($articleTopic) {
				return $articleTopic->articleId;
			}, $this->articleTopicModel->findAllIn("topicId", $topicsIds));
			$filter[] = "id IN (".implode(",", $articlesIds).")";
		}
		if ($sectionId) {
			$filter[] = "sectionId = :sectionId";
			$placeholders["sectionId"] = $sectionId;
		}
		if ($query) {
			$filter[] = "title like :query";
			$placeholders["query"] = "%$query%";
		}
		$limit = 10;
		$str = implode(" and ", $filter);
		if ($str) {
			$str = "where ".$str;
		}

		$articles = $this->articleModel->findAll($str, $placeholders, limit: $limit, offset: ($page - 1) * $limit);

		$articlesIds = [];
		$articlesMapById = [];
		$authorIdMapById = [];
		$sectionMapById = [];

		$sections = $this->sectionModel->findAll();

		foreach ($sections as $section) {
			$sectionMapById[$section->id] = $section;
		}

		foreach ($articles as $article) {
			$article->section = $sectionMapById[$article->sectionId];
			$articlesIds[] = $article->id;
			$articlesMapById[$article->id] = $article;
			$articlesMapById[$article->id]->topics = [];
			$authorIdMapById[$article->authorId] = null;
			unset($article->sectionId);
		}


		$pagination = [
			"page" => $page,
			"count" => $limit,
			"total" => $this->articleModel->count($str, $placeholders)
		];
		if (count($articles) > 0) {


			$articlesTopics = $this->articleTopicModel->findAllIn("articleId", $articlesIds);
			if (count($articlesTopics) > 0) {

				$topicsIds = [];
				foreach ($articlesTopics as $articleTopic) {
					$topicsIds[] = $articleTopic->topicId;
				}
				$topics = $this->topicModel->findAllIn("id", $topicsIds);
				$topicsMapById = [];
				foreach ($topics as $topic) {
					$topicsMapById[$topic->id] = $topic;
				}
				foreach ($articlesTopics as $articleTopic) {
					$articlesMapById[$articleTopic->articleId]->topics[] = $topicsMapById[$articleTopic->topicId];
				}
			}
		}

		if (count($authorIdMapById) > 0) {
			$authors = $this->userModel->findAllIn("id", array_keys($authorIdMapById));
			foreach ($authors as $author) {
				unset($author->password);
				$authorIdMapById[$author->id] = $author;
			}
			foreach ($articlesMapById as $article) {
				if ($article) {
					$article->author = $authorIdMapById[$article->authorId];
				}
			}
		}
		return [
			"articles" => array_values($articlesMapById),
			"pagination" => $pagination,
		];
	}

	public function findById(Request $request)
	{
		$id = $request->attributes->get("id");
		$article = $this->articleModel->findByID($id);
		if (!$article) {
			return response(["message" => "Article not found"], Response::HTTP_NOT_FOUND);
		}
		$article->author = $this->userModel->findByID($article->authorId);
		$article->section = $this->sectionModel->findByID($article->sectionId);
		$article->topics = $this->topicModel->findAllIn("id", array_map(function ($articleTopic) {
			return $articleTopic->topicId;
		}, $this->articleTopicModel->findAllIn("articleId", [$article->id])));
		return $article;
	}

	private function syncTopics(array $topics, int $articleId): void
	{
		$existingTopics = $this->topicModel->findAllIn("name", $topics);

		$newTopics = array_diff($topics, array_map(function ($topic) {
			return $topic->name;
		}, $existingTopics));

		$this->articleTopicModel->deleteByArticleId($articleId);

		if (count($newTopics) > 0) {
			$manyTopicsData = array_values(array_map(function ($topic) {
				return ["name" => $topic];
			}, $newTopics));
			$this->topicModel->createMany($manyTopicsData);
		}


		$associateTopics = $this->topicModel->findAllIn("name", $topics);
		$this->articleTopicModel->createMany(array_map(function ($topic) use ($articleId) {
			return ["topicId" => $topic->id, "articleId" => $articleId];
		}, $associateTopics));
	}
}