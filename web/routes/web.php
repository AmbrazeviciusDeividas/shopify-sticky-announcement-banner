<?php

use App\Lib\CookieHandler;
use App\Lib\AuthRedirection;
use App\Lib\EnsureBilling;
use App\Models\Session;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Shopify\Auth\OAuth;
use Shopify\Clients\HttpHeaders;
use Shopify\Context;
use Shopify\Exception\InvalidWebhookException;
use Shopify\Utils;
use Shopify\Webhooks\Registry;
use Shopify\Webhooks\Topics;

use \App\Http\Controllers\BannersController as BannersController;
use App\Http\Controllers\BillingController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
| If you are adding routes outside of the /api path, remember to also add a
| proxy rule for them in web/frontend/vite.config.js
|
*/


Route::fallback(function (Request $request) {
    if (Context::$IS_EMBEDDED_APP &&  $request->query("embedded", false) === "1") {
        if (env('APP_ENV') === 'production') {
            return file_get_contents(public_path('index.html'));
        } else {
            return file_get_contents(base_path('frontend/index.html'));
        }
    } else {
        return redirect(Utils::getEmbeddedAppUrl($request->query("host", null)) . "/" . $request->path());
    }
})->middleware('shopify.installed');

Route::get('/api/auth', function (Request $request) {
    $shop = Utils::sanitizeShopDomain($request->query('shop'));
    Log::debug('starting api/auth');
    // Delete any previously created OAuth sessions that were not completed (don't have an access token)
    Session::where('shop', $shop)->where('access_token', null)->delete();
    Log::debug('api/auth: ' . $shop, $request->toArray());
    return AuthRedirection::redirect($request);
});
Route::get('/api/auth/callback', function (Request $request) {

    try {
    Log::debug('starting OAuth');
        $session = OAuth::callback(
            $request->cookie(),
            $request->query(),
            [CookieHandler::class, 'saveShopifyCookie'],
        );
    } catch (\Exception $e) {
        Log::error("OAuth callback failed with exception: " . $e->getMessage());
        return response()->json(['message' => 'OAuth callback failed', 'error' => $e->getMessage()], 500);
    }

    $host = $request->query('host');
    $shop = Utils::sanitizeShopDomain($request->query('shop'));

    Log::debug('OAuth Host:' . $host);
    Log::debug('OAuth Shop:' . $shop);

    $response = Registry::register('/api/webhooks', Topics::APP_UNINSTALLED, $shop, $session->getAccessToken());
    if ($response->isSuccess()) {
        Log::debug("Registered APP_UNINSTALLED webhook for shop $shop");
    } else {
        Log::error(
            "Failed to register APP_UNINSTALLED webhook for shop $shop with response body: " .
            print_r($response->getBody(), true)
        );
    }

    $redirectUrl = Utils::getEmbeddedAppUrl($host);
    Log::debug('OAuth redirect embed:' . $shop);
    if (Config::get('shopify.billing.required')) {
        list($hasPayment, $confirmationUrl) = EnsureBilling::check($session, Config::get('shopify.billing'));

        if (!$hasPayment) {
            $redirectUrl = $confirmationUrl;
        }
    }
    Log::debug('OAuth redirect url:' . $shop);
    return redirect($redirectUrl);
});

Route::get('/api/banners', [BannersController::class, 'getBanners'])->middleware('shopify.auth');
Route::patch('/api/banners/{id}', [BannersController::class, 'updateBannersById'])->middleware('shopify.auth');
Route::post('/api/banners', [BannersController::class, 'store'])->middleware('shopify.auth');
Route::get('/api/banners/{id}', [BannersController::class, 'get'])->middleware('shopify.auth');
Route::delete('/api/banners/{id}', [BannersController::class, 'delete'])->middleware('shopify.auth');

Route::get('/api/banner', [BannersController::class, 'proxyGetBanner']);

Route::post('/api/webhooks', static function (Request $request) {
    try {
        $topic = $request->header(HttpHeaders::X_SHOPIFY_TOPIC, '');

        $response = Registry::process($request->header(), $request->getContent());
        if (!$response->isSuccess()) {
            Log::error("Failed to process '$topic' webhook: {$response->getErrorMessage()}");
            return response()->json(['message' => "Failed to process '$topic' webhook"], 500);
        }
    } catch (InvalidWebhookException $e) {
        Log::error("Got invalid webhook request for topic '$topic': {$e->getMessage()}");
        return response()->json(['message' => "Got invalid webhook request for topic '$topic'"], 401);
    } catch (\Exception $e) {
        Log::error("Got an exception when handling '$topic' webhook: {$e->getMessage()}");
        return response()->json(['message' => "Got an exception when handling '$topic' webhook"], 500);
    }
});
