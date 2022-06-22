<?php

namespace App\models;

use PDO;

class ArticleTopic extends Model
{
	protected string $table = "articles_topics";
	protected array $required = [
		"topicId",
		"articleId"
	];

	public function topicsByArticleId($articleId)
	{
		$sql = "SELECT t.* FROM topics t LEFT JOIN articles_topics at ON t.id = at.topicId WHERE at.articleId = :articleId";
		$stmt = $this->connection->prepare($sql);
		$stmt->execute(["articleId" => $articleId]);
		return $stmt->fetchAll(PDO::FETCH_OBJ);
	}

	public function articlesByTopicId($topicId)
	{
		$sql = "SELECT a.* FROM articles a LEFT JOIN articles_topics at ON a.id = at.articleId WHERE at.topicId = :topicId";
		$stmt = $this->connection->prepare($sql);
		$stmt->execute(["topicId" => $topicId]);
		return $stmt->fetchAll(PDO::FETCH_OBJ);
	}

	public function deleteByArticleId(int $articleId)
	{
		return $this->delete("articleId = :articleId", ["articleId" => $articleId]);
	}

	public function deleteByTopicId(int $topicId)
	{
		return $this->delete("topicId = :topicId", ["topicId" => $topicId]);
	}

	public function findByArticleIds(array $articlesIds)
	{
		$test = "select * from articles_topics where articleId in (".implode(", ",
				array_fill(0, count($articlesIds), "?")).")";
		$stmt = ArticleTopic::$pdo->prepare($test);
		$stmt->execute($articlesIds);
		return $stmt->fetchAll(PDO::FETCH_OBJ);
	}
}