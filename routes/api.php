<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\TypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::get('/events', [EventController::class, 'index']);
Route::post('/events', [EventController::class, 'store']);
Route::patch('/events/{event}', [EventController::class, 'update']);
Route::delete('/events/{event}', [EventController::class, 'delete']);

Route::get('/types', [TypeController::class, 'index']);

