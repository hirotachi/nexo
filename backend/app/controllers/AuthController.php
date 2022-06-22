<?php

namespace App\controllers;

use App\Core\Request;
use App\middleware\Auth;
use App\models\User;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;

class AuthController
{

	private User $userModel;

	public function  __construct(User $userModel)
	{
		$this->userModel = $userModel;
	}

	public function register(Request $request)
	{
		$validated = $request->verify([
			"email" => "required|email|unique:users,email",
			"name"=>"required",
			"password"=> "required|min:6"
		]);

		$user = $this->userModel->create([...$validated, "password" => password_hash($validated["password"], PASSWORD_ARGON2I)]);
		$token = generateToken($user);
		return ["message" => "success", "token" => $token];
	}

	public function login(Request $request)
	{
		$validated = $request->verify([
			"email" => "required|email",
			"password"=> "required|min:6"
		]);
		$user = $this->userModel->findOne("email = :email", ["email" => $validated["email"]]);
		if(!$user || !password_verify($validated["password"], $user->password)){
			return response(["message" => "email or password incorrect"], Response::HTTP_UNAUTHORIZED);
		}
		$token = generateToken($user);
		return ["message" => "success", "token" => $token];
	}

	public function passwordReset(Request $request)
	{
		$validated = $request->verify([
			"email" => "required|email"
		]);
		$user = $this->userModel->findOne("email = :email", $validated);
		if (!$user) {
			return \response(["error" => "email is not associated with any account."]);
		}
		return ["message" => "success"];
	}

	public function me()
	{
		return Auth::user();
	}

	public function changePassword(Request $request)
	{
		$validated = $request->verify([
			"currentPassword" => "required|min:6",
			"newPassword" => "required|min:6"
		]);
		$user = Auth::user();
		if(!password_verify($user->password, $validated["currentPassword"])){
			return \response(["error" => "wrong password"], Response::HTTP_UNAUTHORIZED);
		}
		$updated = $this->userModel->updateByID($user->id, ["password" => password_hash($validated["newPassword"], PASSWORD_ARGON2I)]);
		if(!$updated){
			return response(["error" => "password not updated try again"], Response::HTTP_INTERNAL_SERVER_ERROR);
		}
		return ["message" => "success"];
	}
}