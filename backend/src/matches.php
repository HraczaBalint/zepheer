<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Matches extends Model{
    protected $table = 'matches';
    protected $primaryKey = 'match_id';
    public $timestamps = false;
    protected $fillable = ['match_id', 'user_id', 'user_id_matched', 'match_date'];
    protected $guarded = ['match_id'];
}