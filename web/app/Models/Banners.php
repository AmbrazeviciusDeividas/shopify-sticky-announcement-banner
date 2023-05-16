<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banners extends Model
{
    use HasFactory;

    public const POSITION_TOP = 'top';

    public const STATUS_ACTIVE = 'active';
    public const STATUS_INACTIVE = 'inactive';

    public const PAGE_GLOBAL = 'global';
    public const PAGE_HOMEPAGE = 'homepage';
    public const PAGE_CART = 'cart';

    protected $attributes = [
        'position' => self::POSITION_TOP,
        'page' => self::PAGE_GLOBAL
    ];

    protected $fillable = [
        'shop',
        'title',
        'text_align',
        'text_size',
        'text_color',
        'button_content',
        'button_content_color',
        'button_content_size',
        'button_background',
        'button_position',
        'button_background_color',
        'button_border_color',
        'button_border',
        'button_spacing_v',
        'button_spacing_h',
        'page',
        'text_content',
        'padding_top',
        'padding_bottom',
        'padding_left',
        'padding_right',
        'position',
        'background_color',
        'border_radius',
        'action_type',
        'action_separate_tab',
        'action_link',
        'status'
    ];
}
