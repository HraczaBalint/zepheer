<?php

namespace App\Zepheer;

use Illuminate\Database\Eloquent\Model;

class Matches extends Model{
    protected $table = 'matches';
    protected $primaryKey = 'match_id';
    public $timestamps = false;
    protected $fillable = ['user_id', 'user_id_matched'];
}