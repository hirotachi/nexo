<?php

namespace App\middleware;

use App\Core\Request;
use Symfony\Component\HttpFoundation\Response;

class Contributor implements Middleware
{
	public function handle(Request $request, callable $next)
	{
		$user = Auth::user();
		$roles = ["admin", "contributor"];
		if (!in_array($user->role, $roles)) {
			return response(["error" => "Unauthorized, requires Contributor profile permissions."],
				Response::HTTP_UNAUTHORIZED);
		}
		return $next();
	}
}