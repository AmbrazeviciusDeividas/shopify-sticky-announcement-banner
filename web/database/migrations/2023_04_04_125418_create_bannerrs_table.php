<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBannerrsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('banners', function (Blueprint $table) {
            $table->id();

            $table->string('shop', 255)->index();
            $table->string('title', 255);
            $table->string('text_align', 255)->index();
            $table->string('text_size', 255)->index();
            $table->string('text_color', 255);
            $table->string('text_content', 255);
            $table->string('padding_top', 255);
            $table->string('padding_bottom', 255);
            $table->string('padding_left', 255);
            $table->string('padding_right', 255);
            $table->string('position', 255);
            $table->string('background_color', 255);
            $table->string('border_radius', 255);
            $table->string('action_type', 255);
            $table->string('action_separate_tab', 255);
            $table->string('action_link', 255);
            $table->string('status', 255)->index();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('banners');
    }
}
