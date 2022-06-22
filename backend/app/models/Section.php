<?php

namespace App\models;

class Section extends Model
{
	protected array $required = ["name"];
	protected string $table = "sections";
}