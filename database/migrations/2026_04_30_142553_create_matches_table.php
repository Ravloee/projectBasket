<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('matches', function (Blueprint $table) {
        $table->id();
        $table->string('tim_home');
        $table->string('tim_away');
        $table->date('tanggal');
        $table->string('lokasi');
        $table->integer('harga');
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('matches');
}
};
