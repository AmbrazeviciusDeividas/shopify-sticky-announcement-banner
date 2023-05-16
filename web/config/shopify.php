<?php

use App\Lib\EnsureBilling;


return [
    "api_key" => env('SHOPIFY_API_KEY'),
    'apiKey' => env('SHOPIFY_API_KEY'),
    "required" => env('SHOPIFY_BILLING_ENABLED'),
    "plans" => [
        "free" => [
            "required" => false,
            "chargeName" => "Free Plan",
        ],
        "premium" => [
            "required" => true,
            "chargeName" => "Premium Plan",
            "amount" => 7.0,
            "currencyCode" => "USD",
            "interval" => EnsureBilling::INTERVAL_EVERY_30_DAYS,
        ],
    ],
];
