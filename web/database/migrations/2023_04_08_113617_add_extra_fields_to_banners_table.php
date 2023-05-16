<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddExtraFieldsToBannersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->string('button_content', 100)->nullable();
            $table->string('button_content_size', 100)->nullable();
            $table->string('button_content_color', 100)->nullable();
            $table->string('button_background', 10)->nullable();
            $table->string('button_background_color', 10)->nullable();
            $table->string('button_position', 10)->nullable();
            $table->string('button_border_color', 10)->nullable();
            $table->string('button_border', 10)->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->dropColumn(
                [
                    'button_content',
                    'button_content_color',
                    'button_content_size',
                    'button_background',
                    'button_background_color',
                    'button_position'
                ]
            );
        });
    }
}
