<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Encounters extends Model{
    protected $table = 'encounters';
    protected $primaryKey = 'encounter_id';
    public $timestamps = false;
    protected $fillable = ['user_id', 'user_id_rated', 'rating'];
    protected $guarded = ['user_id'];
}