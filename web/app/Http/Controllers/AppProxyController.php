<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppProxyController extends Controller
{
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {

        return response()->json([
            'data' => 'your data from backend'
        ]);
    }
}
