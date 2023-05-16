<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'api/graphql',
        'api/webhooks',
        'api/banner-submit',
        'api/banners',
        'api/banners/*',
        'api/billing',
        'api/activate',
        'proxy_route',

    ];
}
