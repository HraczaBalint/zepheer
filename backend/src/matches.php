<?php

namespace App\Zepheer;

use Illuminate\Database\Eloquent\Model;

class Matches extends Model{
    protected $table = 'matches';
    protected $primaryKey = 'match_id';
    public $timestamps = false;
    protected $guarded = ['match_id'];
}