<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pictures extends Model{
    protected $table = 'pictures';
    protected $primaryKey = 'picture_id';
    public $timestamps = false;
    protected $fillable = ['picture_id', 'picture_name', 'user_id'];
    protected $guarded = ['picture_id'];
}