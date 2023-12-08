<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventType extends Model
{
    use HasFactory;

    protected $guarded = false;

    protected $table = 'event_type';

    protected $fillable = [
        'event_id',
        'type_id',
    ];

}
