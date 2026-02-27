<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;


Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');



Route::middleware(['auth'])->group(function () {
     Route::get('/products', [ProductController::class, 'index'])->name('products');
      Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
     Route::post('/products', [ProductController::class, 'store'])->name('products.store');
     Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
     //Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
     Route::patch('/products/{product}', [ProductController::class, 'update'])->name('products.update');
     Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

Route::post('/shifts/toggle', [ShiftController::class, 'toggle'])->name('shifts.toggle');
    
    Route::post('/shifts', [ShiftController::class, 'store'])->name('shifts.store');
    // Add this line for deleting shifts
    Route::delete('/shifts/{shift}', [ShiftController::class, 'destroy'])->name('shifts.destroy');
    
    // Optional: Add this now if you want to build the "Edit" feature next
    Route::patch('/shifts/{shift}', [ShiftController::class, 'update'])->name('shifts.update');
});



require __DIR__.'/settings.php';
