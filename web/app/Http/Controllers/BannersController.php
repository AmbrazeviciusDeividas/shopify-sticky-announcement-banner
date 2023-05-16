<?php

namespace App\Http\Controllers;

use App\Models\Banners;
use Shopify\Auth\Session as AuthSession;
use Illuminate\Http\Request;
use Shopify\Clients\Rest;
use Illuminate\Support\Facades\Response;
use App\Http\Resources\BannerResource;
use Illuminate\Support\Facades\Cache;

class BannersController extends Controller
{

    public const RENAME_MAP = [
        'actionLink' => 'action_link',
        'actionSeparateTab' => 'action_separate_tab',
        'actionType' => 'action_type',
        'backgroundColor' => 'background_color',
        'bannerTextColor' => 'text_color',
        'borderRadius' => 'border_radius',
        'content' => 'text_content',
        'paddingBottom' => 'padding_bottom',
        'paddingTop' => 'padding_top',
        'paddingLeft' => 'padding_left',
        'paddingRight' => 'padding_right',
        'textAlign' => 'text_align',
        'textSize' => 'text_size',
        'title' => 'title',
        'position' => 'position',
        'page' => 'page',
        'buttonContent' => 'button_content',
        'buttonContentSize' => 'button_content_size',
        'buttonContentColor' => 'button_content_color',
        'buttonBackgroundColor' => 'button_background_color',
        'buttonBackground' => 'button_background',
        'buttonPosition' => 'button_position',
        'buttonBorderColor' => 'button_border_color',
        'buttonSpacingV' => 'button_spacing_v',
        'buttonSpacingH' => 'button_spacing_h',
        'buttonBorder' => 'button_border',
        'status' => 'status'
    ];


    private function handleExistingBanners(array $data, string $shop): void
    {
        $checkExisting = Banners::query()->where([
            'status' => Banners::STATUS_ACTIVE,
            'shop' => $shop,
            'page' => $data['page']
        ])->exists();

        if ($checkExisting && $data['status'] === Banners::STATUS_ACTIVE) {
            Banners::query()->where([
                'status' => Banners::STATUS_ACTIVE,
                'shop' => $shop,
                'page' => $data['page']
            ])->update(['status' => Banners::STATUS_INACTIVE]);
        }
    }

    /**
     * @throws \Shopify\Exception\MissingArgumentException
     * @throws \JsonException
     */
    public function getBanners(Request $request)
    {
        /** @var AuthSession */
        $session = $request->get('shopifySession'); // Provided by the shopify.auth middleware, guaranteed to be active

        $banners = Banners::query()
            ->where([
                'shop' => $session->getShop()
            ])
            ->select(['id', 'title', 'position', 'page', 'created_at', 'status'])
            ->orderBy('id', 'desc')
            ->get();

        return BannerResource::collection($banners)
            ->toResponse($request)
            ->setContent(
                json_encode(
                    BannerResource::collection($banners)->resolve(),
                    JSON_THROW_ON_ERROR
                )
            );
    }

    public static function cloneBanner($id) {

        $banner = Banners::query()->findOrFail($id);
        $clonedBanner = $banner->replicate();
        $clonedBanner->status = Banners::STATUS_INACTIVE;
        $clonedBanner->save();

        return Response::json([
            'message' => 'Banner Clones Successfully!'
        ], 200);
    }

    /**
     * @throws \Shopify\Exception\MissingArgumentException
     */
    public function updateBannersById(Request $request): \Illuminate\Http\JsonResponse
    {
        /** @var AuthSession */
        $session = $request->get('shopifySession');
        $data = $request->all();
        $id = $request->id;

        /** @var Banners $banners */
        $banners = Banners::query()->where([
            'id' => $id,
            'shop' => $session->getShop()
        ])->first();

        if (!$banners) {
            return Response::json([
                'message' => 'Error. This banner does not exists in your shop.'
            ], 500);
        }

        try {
            $renameMap = self::RENAME_MAP;

            $data = array_combine(
                array_map(static function ($el) use ($renameMap) {
                    return $renameMap[$el];
                }, array_keys($data)),
                array_values($data)
            );
            $data['shop'] = $session->getShop();

            $checkExisting = Banners::query()->where([
                'status' => Banners::STATUS_ACTIVE,
                'shop' => $session->getShop(),
                'page' => $data['page'],
            ])->where('id', '!=', $id)->exists();

            if ($checkExisting) {
                Banners::query()->where([
                    'status' => Banners::STATUS_ACTIVE,
                    'shop' => $session->getShop(),
                    'page' => $data['page'],
                ])->where('id', '!=', $id)->update(['status' => Banners::STATUS_INACTIVE]);
            }

            $banners->update($data);
            return Response::json([
                'message' => 'Banner Updated Successfully! 🚀 '
            ], 200);
        } catch (\Throwable $exception) {
            return Response::json([
                'message' => $exception->getMessage()
            ], 500);
        }
    }

    /**
     * @throws \Shopify\Exception\MissingArgumentException
     */
    public function store(Request $request)
    {
        $session = $request->get('shopifySession');
        $data = $request->all();

        $client = new Rest($session->getShop(), $session->getAccessToken());
        $renameMap = self::RENAME_MAP;

        $data = array_combine(
            array_map(static function ($el) use ($renameMap) {
                return $renameMap[$el];
            }, array_keys($data)),
            array_values($data)
        );
        $data['shop'] = $session->getShop();

        try {
            $this->handleExistingBanners($data, $session->getShop());

            Banners::query()->create($data);
            return Response::json([
                'message' => 'Banner Created Successfully! 🚀 '
            ], 200);
        } catch (\Throwable $exception) {
            return Response::json([
                'message' => $exception->getMessage()
            ], 500);
        }
    }

    public function get(Request $request)
    {
        /** @var AuthSession */
        $session = $request->get('shopifySession');
        $id = $request->id;

        /** @var Banners $banners */
        $banners = Banners::query()->where([
            'id' => $id,
            'shop' => $session->getShop()
        ])->first();

        return response($banners->toJson());
    }

    public function delete(Request $request)
    {
        /** @var AuthSession */
        $session = $request->get('shopifySession'); // Provided by the shopify.auth middleware, guaranteed to be active
        $id = $request->id;

        /** @var Banners $banners */
        $banners = Banners::query()->where([
            'id' => $id,
            'shop' => $session->getShop()
        ])->first();
        $banners->delete();

        return response($banners->toJson());
    }

    public function proxyGetBanner(Request $request)
    {
        $page = $request->get('page');
        $shop = $request->get('shop_name') . '.myshopify.com';
        $pageShow = Banners::PAGE_GLOBAL;

        if ($page === 'index') {
            $pageShow = Banners::PAGE_HOMEPAGE;
        } else {
            if ($page === 'cart') {
                $pageShow = Banners::PAGE_CART;
            }
        }
        try {
            $banner = Banners::query()->where([
                'status' => Banners::STATUS_ACTIVE,
                'page' => $pageShow,
                'shop' => $shop
            ])->first();

            if (!$banner) {
                return Response::json([
                    'message' => 'No banner'
                ], 200);
            }

            return response($banner->toJson(), 200);
        } catch (\Throwable $throwable) {
            return Response::json([
                'message' => 'Error. No existing banners in shop.'
            ], 500);
        }
    }
}
