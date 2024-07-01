<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User; 
class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $userCreate = User::create(
            [
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                ]
        );
        return response()->json(['user' => $userCreate], 201);

    }
}
