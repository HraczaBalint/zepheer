<?php

namespace App\Zepheer;

use Illuminate\Database\Eloquent\Model;

class Users extends Model{
    protected $table = 'users';
    protected $primaryKey = 'user_id';
    public $timestamps = false;
    protected $guarded = ['user_id'];
}