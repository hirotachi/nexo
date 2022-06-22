<?php

namespace App\controllers;

use App\Core\Request;
use App\models\Section;

class SectionsController
{

	public function __construct(Section $sectionModel)
	{
		$this->sectionModel = $sectionModel;
	}

	public function all()
	{
		return $this->sectionModel->findAll();
	}

	public function create(Request $request)
	{
		$validated = $request->verify([
			"name" => "required"
		]);
		$section = $this->sectionModel->create($validated);
		return ["message" => "success", "section" => $section];
	}

	public function update(Request $request)
	{
		$id = $request->attributes->get("id");
		$validated = $request->verify([
			"name" => "required"
		]);
		$section = $this->sectionModel->update($validated);
		return ["message" => "success", "section" => $section];
	}

	public function delete(Request $request)
	{
		$id = $request->attributes->get("id");
		$section = $this->sectionModel->delete($id);
		return ["message" => "success", "section" => $section];
	}

}