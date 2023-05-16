<?php

namespace App\Http\Controllers;

use GuzzleHttp\Exception\GuzzleException;
use Shopify\Clients;
use App\Models\Banners;
use Shopify\Auth\Session as AuthSession;
use Illuminate\Http\Request;
use Shopify\Clients\Rest;
use Illuminate\Support\Facades\Response;
use App\Http\Resources\BannerResource;
use Illuminate\Support\Facades\Cache;
use App\Lib\EnsureBilling;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Config;
use Shopify\Auth\OAuth;
use Shopify\Context;
use Shopify\Exception\MissingArgumentException;
use App\Helpers\ShopifyApi;
use Illuminate\Support\Facades\Redirect;

class BillingController extends Controller
{

    public function redirectToBilling(Request $request)
    {
        $shop = $request->user(); // Assuming you have a Shop model with user authentication

        $planData = [
            'name' => env('SHOPIFY_APP_PLAN_NAME'),
            'price' => env('SHOPIFY_APP_PLAN_PRICE'),
            'trial_days' => env('SHOPIFY_APP_PLAN_TRIAL_DAYS'),
            'return_url' => route('billing.callback'),
        ];

        $response = ShopifyApi::request($shop, 'POST', 'recurring_application_charges', [
            'recurring_application_charge' => $planData,
        ]);

        return Redirect::to($response['recurring_application_charge']['confirmation_url']);
    }

    public function billingCallback(Request $request)
    {
        $shop = $request->user(); // Assuming you have a Shop model with user authentication
        $chargeId = $request->input('charge_id');

        $response = ShopifyApi::request($shop, 'GET', "recurring_application_charges/{$chargeId}");

        if ($response['recurring_application_charge']['status'] === 'accepted') {
            // Activate the charge
            ShopifyApi::request($shop, 'POST', "recurring_application_charges/{$chargeId}/activate");

            // Update your Shop model with the billing status and charge details
        }

        return redirect()->route('home');
    }

}
