<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Type extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'title'];

    public function events(): belongsToMany
    {
        return $this->belongsToMany(Event::class, 'event_type', 'type_id', 'event_id');
    }

}
