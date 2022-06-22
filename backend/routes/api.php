<?php


use App\controllers\ArticlesController;
use App\controllers\AuthController;
use App\controllers\SectionsController;
use App\controllers\UserController;
use App\Core\Route;

Route::get("/", function () {
	return "from api working";
});

// auth --------------------------------------

Route::post("/register", [AuthController::class, "register"]);
Route::post("/login", [AuthController::class, "login"]);
Route::post("/reset", [AuthController::class, "passwordReset"]);

Route::get("/me", [AuthController::class, "me"])->middleware("auth");
Route::put("/account", [AuthController::class, "updateAccount"])->middleware("auth");
Route::put("/role", [AuthController::class, "changeRole"])->middleware("auth");
Route::put("/password", [AuthController::class, "changePassword"])->middleware("auth");
Route::put("/avatar", [AuthController::class, "changeAvatar"])->middleware("auth");

// articles crud -----------------------------------------------------
Route::group("/articles", function () {
	Route::post("/", [ArticlesController::class, "create"])->middleware(["auth", "contributor"]);
	Route::get("/", [ArticlesController::class, "all"]);
	Route::get("/{id}", [ArticlesController::class, "findByID"]);
	Route::put("/{id}", [ArticlesController::class, "update"])->middleware(["auth", "contributor"]);
	Route::delete("/{id}", [ArticlesController::class, "delete"])->middleware("auth");
});

// sections crud -----------------------------------------------------
Route::group("/sections", function () {
	Route::get("/", [SectionsController::class, "all"]);
	Route::post("/", [SectionsController::class, "create"])->middleware(["auth", "admin"]);
	Route::put("/{id}", [SectionsController::class, "update"])->middleware(["auth", "admin"]);
	Route::delete("/{id}", [SectionsController::class, "delete"])->middleware(["auth", "admin"]);
});


// admin controls
Route::group("/users", function () {
	Route::get("/", [UserController::class, "all"])->middleware(["auth", "admin"]);
	Route::delete("/{id}", [UserController::class, "remove"])->middleware(["auth", "admin"]);
	Route::delete("/", [UserController::class, "removeMany"])->middleware(["auth", "admin"]);
	Route::get("/{id}", [UserController::class, "getOne"]);
});