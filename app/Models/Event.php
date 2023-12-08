<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Event extends Model
{
    use HasFactory;

    protected $guarded = false;

    public function types(): belongsToMany
    {
        return $this->belongsToMany(Type::class, 'event_type', 'event_id', 'type_id');
    }

}
