<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Shift extends Model
{
    protected $fillable = ['user_id', 'clocked_in_at', 'clocked_out_at'];

    // This makes sure 'duration' is included when the model is sent to React
    protected $appends = ['duration'];

    protected $casts = [
        'clocked_in_at' => 'datetime',
        'clocked_out_at' => 'datetime',
    ];

    /**
     * Accessor for the 'duration' property.
     */
    public function getDurationAttribute()
    {
        if (!$this->clocked_out_at) {
            return 'Active';
        }
        
        // Using diffAsCarbonInterval for that nice "1h 30m" format
        return $this->clocked_in_at->diffAsCarbonInterval($this->clocked_out_at)
                    ->forHumans(['short' => true]); 
    }
}