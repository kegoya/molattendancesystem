<?php

namespace App\Http\Controllers;

use App\Models\Shift; // Fixed: Use singular Shift to match the Model filename
use Illuminate\Http\Request;

class ShiftController extends Controller
{
    /**
     * Toggle the shift status (Clock In / Clock Out).
     */
    public function toggle(Request $request)
    {
        $user = $request->user();
        
        // Find the most recent shift that hasn't been clocked out yet
        $activeShift = $user->shifts()->whereNull('clocked_out_at')->first();

        if ($activeShift) {
            // Clock Out
            $activeShift->update(['clocked_out_at' => now()]);
        } else {
            // Clock In
            $user->shifts()->create(['clocked_in_at' => now()]);
        }

        return back();
    }


    public function update(Request $request, Shift $shift)
{
    // Security check
    if ($shift->user_id !== auth()->id()) {
        abort(403);
    }

    $validated = $request->validate([
        'clocked_in_at' => 'required|date',
        'clocked_out_at' => 'nullable|date|after_or_equal:clocked_in_at',
    ]);

    $shift->update($validated);

    return back();
}

public function store(Request $request)
{
    $validated = $request->validate([
        'clocked_in_at' => 'required|date',
        'clocked_out_at' => 'required|date|after:clocked_in_at',
    ]);

    $request->user()->shifts()->create($validated);

    return back();
}
    /**
     * Remove the specified shift from storage.
     */
    public function destroy(Shift $shift)
{
    try {
        // Optional: Check if the user owns this shift before deleting
        if ($shift->user_id !== auth()->id()) {
            return back()->with('error', 'You do not have permission to delete this record.');
        }

        $shift->delete();

        return back()->with('success', 'Shift record deleted successfully.');
    } catch (\Exception $e) {
        // Log the error for debugging purposes
        \Log::error("Shift deletion failed: " . $e->getMessage());

        return back()->with('error', 'Failed to delete the shift. Please try again.');
    }
}
}