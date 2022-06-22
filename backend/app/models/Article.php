<?php

namespace App\models;

use App\middleware\Auth;

class Article extends Model
{
	protected string $table = "articles";
	protected array $required = [
		"title",
		"preview",
		"content"
	];
}