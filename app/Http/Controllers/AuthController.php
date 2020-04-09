<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use JWTAuth;

class AuthController extends Controller
{

    public function __construct()
    {
        Config::set('jwt.auth', User::class);
        Config::set('auth.providers', ['users' => [
            'driver' => 'eloquent',
            'model'  => User::class,
        ]]);
        // $this->middleware('jwt.auth', ['except' => ['register', 'login']]);
    }

    public $loginAfterSignUp = true;

      /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $user = User::where('email', '=', request('email'))->first();
        $token = JWTAuth::fromUser($user);
        $user->{"token"} = $token;

        return $this->respondWithToken($token);
    }

    public function register()
    {
        User::create([
            'name' => request('name'),
            'email' => request('email'),
            'password' => Hash::make(request('password')),
        ]);

        return $this->login(request());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json([auth()->user()]);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            // 'expires_in' => auth()->factory()->getTTL() * 60
            'expires_in' => 3600,
            'user' => auth()->user()
        ]);
    }
}
