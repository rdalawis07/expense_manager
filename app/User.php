<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Support\Facades\Hash;

class User extends Model
{
    //
    protected $table = 'users';
    protected $fillable = [
        'name',
        'email',
        'role_id',
        'updated_at',
    ];

    public static function fetchAll(){

        $user = DB::select("SELECT a.id, a.name, a.email, b.id as role_id, b.name as role_name, a.password, a.created_at FROM users as a 
            INNER JOIN roles as b ON a.role_id = b.id ORDER BY a.name ASC");    
        
        return $user;
    }

    public static function fetchSpecific($email, $password){

        $user = DB::select("SELECT a.id, a.name, a.email, b.name as role_name, a.password FROM users as a 
                INNER JOIN roles as b ON a.role_id = b.id WHERE a.email = '$email' LIMIT 1");
        
        if(Hash::check($password, $user[0]->password)){
            return $user;
        }else{
            return 'failed';
        }
        
    }

}
