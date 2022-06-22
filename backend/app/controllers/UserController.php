<?php

namespace App\controllers;

use App\Core\Request;
use App\models\User;
use Symfony\Component\HttpFoundation\Response;

class UserController
{
	private User $userModel;

	public function __construct(User $userModel)
	{
		$this->userModel = $userModel;
	}

	public function all(Request $request)
	{
		$page = $request->query->get("page") ?? 1;
		$limit = $request->query->get("limit") ?? 10;
		$offset = ($page - 1) * $limit;
		$users = $this->userModel->findAll(limit: $limit, offset: $offset);
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
		$userId = $request->query->get("id");
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
}