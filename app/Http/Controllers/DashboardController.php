<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon; // <--- Add this line!

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
    $now = Carbon::now();

    // 1. Calculate Today's Total (Seconds)
    $todaySeconds = $user->shifts()
        ->whereDate('clocked_in_at', $now->toDateString())
        ->whereNotNull('clocked_out_at')
        ->get()
        ->sum(fn($shift) => Carbon::parse($shift->clocked_in_at)->diffInSeconds($shift->clocked_out_at));

    // 2. Calculate This Week's Total (Seconds)
    $weekSeconds = $user->shifts()
        ->whereBetween('clocked_in_at', [$now->startOfWeek()->toDateTimeString(), $now->endOfWeek()->toDateTimeString()])
        ->whereNotNull('clocked_out_at')
        ->get()
        ->sum(fn($shift) => Carbon::parse($shift->clocked_in_at)->diffInSeconds($shift->clocked_out_at));
        $chartData = collect(range(6, 0))->map(function ($daysAgo) use ($user) {
        $date = now()->subDays($daysAgo);
        $seconds = $user->shifts()
            ->whereDate('clocked_in_at', $date->toDateString())
            ->whereNotNull('clocked_out_at')
            ->get()
            ->sum(fn($shift) => Carbon::parse($shift->clocked_in_at)->diffInSeconds($shift->clocked_out_at));

        return [
            'day' => $date->format('D'), // e.g., "Mon"
            'hours' => round($seconds / 3600, 1), // e.g., 7.5
        ];
    });

    return Inertia::render('dashboard', [
        'stats' => [
            'today' => $this->formatSeconds($todaySeconds),
            'week' => $this->formatSeconds($weekSeconds),
            'weekSeconds' => (int) $weekSeconds,
        ],
        'isActive' => $user->shifts()->whereNull('clocked_out_at')->exists(),
        'shifts' => $user->shifts()->latest()->get(), // This must be plural 'shifts'
        'chartData' => $chartData,
    ]);
    }

    private function formatSeconds($seconds)
{
    $hours = floor($seconds / 3600);
    $minutes = floor(($seconds / 60) % 60);
    return "{$hours}h {$minutes}m";
}



public function handleScan(Request $request)
{
    $request->validate(['code' => 'required|string']);

    // Find user by their QR/Fingerprint ID (Assuming you add a 'card_id' column)
    $user = User::where('card_id', $request->code)->first();

    if (!$user) {
        return back()->with('error', 'Unknown ID Card or Fingerprint.');
    }

    // Toggle logic
    $activeShift = $user->shifts()->whereNull('clocked_out_at')->first();

    if ($activeShift) {
        $activeShift->update(['clocked_out_at' => now()]);
        $message = "Goodbye, {$user->name}. Clocked out successfully.";
    } else {
        $user->shifts()->create(['clocked_in_at' => now()]);
        $message = "Welcome, {$user->name}. Clocked in successfully.";
    }

    return back()->with('success', $message);
}

public function attendanceStation(Request $request) {
    $recentScans = \App\Models\Shift::with('user')
        ->latest('clocked_in_at')
        ->take(3)
        ->get()
        ->map(function ($shift) {
            return [
                'id' => $shift->id,
                'name' => $shift->user->name,
                'type' => $shift->clocked_out_at ? 'OUT' : 'IN',
                'time' => \Carbon\Carbon::parse($shift->clocked_out_at ?? $shift->clocked_in_at)->format('H:i:s'),
            ];
        });

    return Inertia::render('welcome', [
        'isActive' => $request->user() ? $request->user()->shifts()->whereNull('clocked_out_at')->exists() : false,
        'recentScans' => $recentScans,
    ]);
}

}