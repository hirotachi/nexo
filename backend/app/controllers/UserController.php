<?php

namespace App\controllers;

use App\Core\Request;
use App\models\Article;
use App\models\Section;
use App\models\User;
use Symfony\Component\HttpFoundation\Response;

class UserController
{
	private User $userModel;
	private Article $articleModel;
	private Section $sectionModel;

	public function __construct(User $userModel, Article $articleModel, Section $sectionModel)
	{
		$this->userModel = $userModel;
		$this->articleModel = $articleModel;
		$this->sectionModel = $sectionModel;
	}

	public function all(Request $request)
	{
		$page = $request->query->get("page") ?? 1;
		$limit = $request->query->get("limit") ?? 10;
		$query = $request->query->get("query") ?? null;
		$offset = ($page - 1) * $limit;
		$placeholder = $query ? ["query" => "%$query%"] : [];
		$users = $this->userModel->findAll($query ? "where name like :query or email like :query" : "", $placeholder,
			limit: $limit, offset: $offset);
		$count = $this->userModel->count();
		$pagination = [
			"page" => $page,
			"limit" => $limit,
			"total" => $count,
			"pages" => ceil($count / $limit)
		];
		foreach ($users as $user) {
			unset($user->password);
		}
		return ["users" => $users, "pagination" => $pagination];
	}

	public function remove(Request $request)
	{
		$userId = $request->attributes->get("id");
		if (!$userId) {
			return \response(["error" => "id is required"], Response::HTTP_BAD_REQUEST);
		}
		$user = $this->userModel->findOne("id = :id", ["id" => $userId]);
		if (!$user) {
			return \response(["error" => "user not found"], Response::HTTP_NOT_FOUND);
		}
		$this->userModel->deleteByID($userId);
		return ["message" => "success"];
	}

	public function removeMany(Request $request)
	{
		$userIds = $request->query->get("ids");
		if (!$userIds) {
			return \response(["error" => "no users selected"], Response::HTTP_NOT_FOUND);
		}
		$userIds = explode(",", $userIds);
		$users = $this->userModel->findAllIn("id", $userIds);
		if (!$users) {
			return \response(["error" => "users not found"], Response::HTTP_NOT_FOUND);
		}
		$this->userModel->deleteManyByField("id", $userIds);
	}

	public function getOne(Request $request)
	{
		$userId = $request->attributes->get("id");
		$user = $this->userModel->findByID($userId);
		if (!$user) {
			return \response(["error" => "user not found"], Response::HTTP_NOT_FOUND);
		}
		unset($user->password);
		return $user;
	}

	public function articles(Request $request)
	{
		$userId = $request->attributes->get("id");
		$user = $this->userModel->findByID($userId);
		if (!$user) {
			return \response(["error" => "user not found"], Response::HTTP_NOT_FOUND);
		}
		unset($user->password);
		$articles = $this->articleModel->findAll("where authorId = :user_id", ["user_id" => $userId]);
		$sectionsMapById = [];
		foreach ($articles as $article) {
			$sectionsMapById[$article->sectionId] = null;
		}
		$sections = $this->sectionModel->findAllIn("id", array_keys($sectionsMapById));

		foreach ($sections as $section) {
			$sectionsMapById[$section->id] = $section;
		}

		foreach ($articles as $article) {
			$article->author = $user;
			$article->section = $sectionsMapById[$article->sectionId];
		}
		return $articles;
	}
}