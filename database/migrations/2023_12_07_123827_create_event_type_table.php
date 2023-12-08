<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_type', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_id');
            $table->unsignedBigInteger('type_id');

            $table->index('event_id', 'event_type_event_idx');
            $table->index('event_id', 'event_type_type_idx');

            $table->foreign('event_id', 'event_type_event_fk')->on('events')->references('id')->cascadeOnDelete();
            $table->foreign('event_id', 'event_type_type_fk')->on('types')->references('id')->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_type');
    }
};
