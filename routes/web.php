<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');



Route::middleware(['auth'])->group(function () {
    Route::post('/shifts/toggle', [ShiftController::class, 'toggle'])->name('shifts.toggle');
    
    Route::post('/shifts', [ShiftController::class, 'store'])->name('shifts.store');
    // Add this line for deleting shifts
    Route::delete('/shifts/{shift}', [ShiftController::class, 'destroy'])->name('shifts.destroy');
    
    // Optional: Add this now if you want to build the "Edit" feature next
    Route::patch('/shifts/{shift}', [ShiftController::class, 'update'])->name('shifts.update');
});



require __DIR__.'/settings.php';
