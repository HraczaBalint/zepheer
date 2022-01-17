<?php

namespace App\Zepheer;

use Illuminate\Database\Eloquent\Model;

class Pictures extends Model{
    protected $table = 'pictures';
    protected $primaryKey = 'picture_id';
    public $timestamps = false;
    protected $fillable = ['picture_name', 'user_id'];
}