<?php

namespace App\Http\Controllers;

use App\Models\Banners;
use Illuminate\Http\Request;
use App\Models\User;
use Shopify\Auth\OAuth;
use Illuminate\Support\Facades\Auth;
use Log;

class ShopifyAppController extends Controller
{
    protected $shopifyAuth;

    public function __construct(OAuth $shopifyAuth)
    {
        $this->shopifyAuth = $shopifyAuth;
    }

    public function index() {
        $shop = Auth::user();
        $domain = $shop->getDomain()->toNative();
        $shopApi = $shop->api()->rest('GET', '/admin/shop.json')['body']['shop'];

        Log::info("Shop {$domain}'s object:" . json_encode($shop));
        Log::info("Shop {$domain}'s API objct:" . json_encode($shopApi));
        return;
    }

    public function install(Request $request)
    {
        // Verify the request is coming from Shopify and validate required parameters
        $this->shopifyAuth->verifyShopifyRequest($request);

        // Exchange the temporary code for a permanent access token
        $accessToken = $this->shopifyAuth->getAccessToken($request->input('shop'), $request->input('code'));

        // Save the shop and access token to the users table
        $user = User::query()->firstOrCreate(
            ['shop_domain' => $request->input('shop')],
            ['access_token' => $accessToken]
        );

        // Redirect to the app's home page
        return redirect()->route('shopify.installed', ['shop' => $request->input('shop')]);
    }


    public function store(Request $request): \Illuminate\Http\JsonResponse
    {

        $session = $request->get('shopifySession'); // Provided by the shopify.auth middleware, guaranteed to be active

        $client = new Rest($session->getShop(), $session->getAccessToken());
        $result = $client->get('products/count');

        $data = $request->validate([
            'shop' => 'string',
            'title' => 'string',
            'text_align' => 'string',
            'text_size' => 'string',
            'text_color' => 'string',
            'text_content' => 'string',
            'padding_top' => 'string',
            'padding_bottom' => 'string',
            'padding_left' => 'string',
            'padding_right' => 'string',
            'position' => 'string',
            'background_color' => 'string',
            'border_radius' => 'string',
            'action_type' => 'string',
            'action_separate_tab' => 'string',
            'action_link' => 'string',
            'status' => 'string'
        ]);

        $product = Banners::create($data);

        return response()->json(['success' => true, 'product' => $product], 201);
    }
}
