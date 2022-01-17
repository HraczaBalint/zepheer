<?php

namespace App\Zepheer;

use Illuminate\Database\Eloquent\Model;

class Token extends Model{
    protected $table = 'tokens';
    protected $primaryKey = 'token_id';
    public $timestamps = false;
    protected $guarded = ['token_id'];
}