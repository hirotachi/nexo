<?php


use App\controllers\ArticlesController;
use App\controllers\AuthController;
use App\controllers\SectionsController;
use App\Core\Route;

Route::get("/", function () {
	return "from api working";
});

// auth --------------------------------------

Route::post("/register", [AuthController::class, "register"]);
Route::post("/login", [AuthController::class, "login"]);
Route::post("/reset", [AuthController::class, "passwordReset"]);

Route::get("/me", [AuthController::class, "me"])->middleware("auth");

// articles crud -----------------------------------------------------

Route::post("/articles", [ArticlesController::class, "create"])->middleware(["auth", "contributor"]);
Route::get("/articles", [ArticlesController::class, "all"]);
Route::get("/articles/{id}", [ArticlesController::class, "findByID"]);
Route::put("/articles/{id}", [ArticlesController::class, "update"])->middleware(["auth", "contributor"]);
Route::delete("/articles/{id}", [ArticlesController::class, "delete"])->middleware("auth");

// sections crud -----------------------------------------------------
Route::get("/sections", [SectionsController::class, "all"]);
Route::post("/sections", [SectionsController::class, "create"])->middleware(["auth", "admin"]);
Route::put("/sections/{id}", [SectionsController::class, "update"])->middleware(["auth", "admin"]);
Route::delete("/sections/{id}", [SectionsController::class, "delete"])->middleware(["auth", "admin"]);
