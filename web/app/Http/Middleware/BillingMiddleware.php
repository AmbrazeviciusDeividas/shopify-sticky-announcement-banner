<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Helpers\ShopifyApi;

class BillingMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $shop = $request->user(); // Assuming you have a Shop model with user authentication

        // If the shop does not have a plan or is not paid, redirect to the billing screen
        if (!$shop->plan || !$shop->isPaid()) {
            return redirect()->route('billing.redirect');
        }

        return $next($request);
    }
}
