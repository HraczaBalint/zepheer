<?php

namespace App\Zepheer;

use Illuminate\Database\Eloquent\Model;

class Encounters extends Model{
    protected $table = 'encounters';
    protected $primaryKey = 'encounter_id';
    public $timestamps = false;
    protected $guarded = ['user_id'];
}