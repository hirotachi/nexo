<?php

namespace App\middleware;

use App\Core\Request;
use App\models\User;
use Symfony\Component\HttpFoundation\Response;

class Auth implements Middleware
{

	static private object $user;


	public static function user(): object
	{
		$user = self::$user;
		unset($user->password);
		return self::$user;
	}

    public function handle(Request $request, callable $next)
    {
        verifyAuthToken($request);
        $userId = $request->attributes->get("userId");
	    $userModel = new User();

	    $user = $userModel->findByID($userId);

        if (!$user) {
            return response(["error" => "Valid access_token in cookies"], Response::HTTP_UNAUTHORIZED);
        }
		self::$user=$user;
        return $next();
    }
}