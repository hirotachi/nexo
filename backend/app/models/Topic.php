<?php

namespace App\models;

class Topic extends Model
{
	protected string $table = "topics";
	protected array $required = [
		"name"
	];

}