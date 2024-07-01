<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SessionUser; 
use App\Models\Product;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $token = $request-> header('token');
        $checkTokenIsValid = SessionUser::where('token', $token)->first();
        if (empty($token)) 
        {
            return response()->json(
                [
                    'code'=> 401,
                    'message'=>"Fail"
                ],401);
        }
        else if(empty($checkTokenIsValid))
        {
            return response()->json(
                [
                    'code'=> 401,
                    'message'=>"Token is not valid"
                ],401);
        }
        else{
            $products = Product::all();
            return response()->json(
                [
                    'code'=> 200,
                    'data'=> $products
                ],200);
        }
    }
}
