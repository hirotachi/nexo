<?php


use App\controllers\AuthController;
use App\Core\Route;

Route::get("/", function () {
    return "from api working";
});


Route::post("/register", [AuthController::class, "register"]);
Route::post("/login", [AuthController::class, "login"]);
Route::post("/reset", [AuthController::class, "passwordReset"]);

Route::get("/me", [AuthController::class, "me"])->middleware("auth");