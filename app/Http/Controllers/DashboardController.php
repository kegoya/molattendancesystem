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
}