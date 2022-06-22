<?php

namespace App\middleware;

use App\Core\Request;
use Symfony\Component\HttpFoundation\Response;

class Admin implements Middleware
{

	public function handle(Request $request, callable $next)
	{
		$user = Auth::user();
		if ($user->role !== "admin") {
			return response(["error" => "Unauthorized, requires Admin permissions."],
				Response::HTTP_UNAUTHORIZED);
		}
		return $next();
	}
}