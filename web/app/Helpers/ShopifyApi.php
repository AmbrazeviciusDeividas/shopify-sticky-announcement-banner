<?php

namespace App\Helpers;

use GuzzleHttp\Client;

class ShopifyApi
{
    /**
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws \JsonException
     */
    public static function request($shop, $method, $path, $data = [])
    {
        $client = new Client();
        $url = "https://{$shop}/admin/api/2022-01/{$path}.json";

        $response = $client->request($method, $url, [
            'headers' => [
                'X-Shopify-Access-Token' => $shop->access_token,
                'Content-Type' => 'application/json',
            ],
            'json' => $data,
        ]);

        return json_decode($response->getBody(), true, 512, JSON_THROW_ON_ERROR);
    }
}
