<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SessionUser; // Ensure you have this model
use Illuminate\Support\Str;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $dataCheckLogin = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (auth()->attempt($dataCheckLogin)) {
            $checkTokenExists = SessionUser::where('user_id', auth()->id())->first();

            if (empty($checkTokenExists)) {
                $userSession = SessionUser::create([
                    'user_id' => auth()->id(), // Ensure you have this field in your table
                    'token' => Str::random(40),
                    'refresh_token' => Str::random(40),
                    'token_expired' => date('Y-m-d H:i', strtotime('+30 day')),
                    'refresh_token_expired' => date('Y-m-d H:i', strtotime('+360 day')),
                ]);
            } else {
                $userSession = $checkTokenExists;
            }

            return response()->json([
                'code' => 200,
                'data' => $userSession
            ], 200);
        }

        return response()->json([
            'code' => 401,
            'message' => 'Invalid credentials'
        ], 401);
    }

    // public function refreshToken()
    // {

    // }
}
