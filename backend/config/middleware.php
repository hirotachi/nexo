<?php


use App\Core\Route;
use App\middleware\Admin;
use App\middleware\Auth;
use App\middleware\Contributor;

Route::middleware(Auth::class, "auth");
Route::middleware(Admin::class, "admin");
Route::middleware(Contributor::class, "contributor");