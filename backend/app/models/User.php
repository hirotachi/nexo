<?php

namespace App\models;

class User extends Model
{
	protected string $table = "users";
	protected array $required = ["name", "email", "password"];
	protected array $defaults = [
		"role" => "user"
	];
}