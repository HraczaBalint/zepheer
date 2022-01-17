<?php

namespace App\Zepheer;

use Illuminate\Database\Eloquent\Model;

class Users extends Model{
    protected $table = 'users';
    protected $primaryKey = 'user_id';
    public $timestamps = true;
    protected $fillable = ['user_name', 'user_password', 'user_email', 'user_gender', 'user_gender_preference', 'user_age', 'user_age_preference', 'user_description'];
}