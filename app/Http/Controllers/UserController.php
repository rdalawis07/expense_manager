<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\User as User;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{

    public function index(){
        $user = User::fetchAll();
        return $user;
    }

    public function login(Request $request){
        //
        $email = $request->Input('email') ?? null;
        $password = $request->Input('password') ?? null;

        try{

            $user = User::fetchSpecific($email, $password);
            
        }catch(Exception $ex){
            return $ex->getMessage();
        }
          
        return $user;
    }

    public function create(Request $request){
        try {
            $user = new User;
            $user->name = $request->Input('name');
            $user->email = $request->Input('email');
            $user->role_id = $request->Input('role_id');
            $user->password = Hash::make($request->Input('password'));
            $user->save();

            return $this->index();
        }catch(Exception $e){
            return $e->getMessage();
        }
    }


    public function update(Request $request){
        try{
            $user = user::find($request->Input('id'));
            $user->name = $request->Input('name');
            $user->email = $request->Input('email');
            $user->role_id = $request->Input('role_id');
            $user->password = Hash::make($request->Input('password'));
            $user->save();

            return $this->index();
        }catch(Exception $e){
            return $e->getMessage();
        }
    }

    public function delete(Request $request){
        //
        try{
            $user = user::find($request->Input('id'));
            $user->delete();

            return $this->index();
        }catch(Exception $e){
            return $e->getMessage();
        }
    }

    public function editpassword(Request $request){
        try{
            $oldPassword = $request->Input('old_password');
            $newPassword = $request->Input('new_password');
            $hashPassword = $request->Input('hashed_password');

            if(Hash::check($oldPassword, $hashPassword)){
                $user = user::find($request->Input('id'));
                $user->password = Hash::make($newPassword);
                $user->save();

                return json_encode(array('api_status' => 'success', 'api_header' => 'Success', 'message' => 'Successfully Change Password'));
            }else{
                return json_encode(array('api_status' => 'error', 'api_header' => 'Error', 'message' => 'Old password did not match.'));
            }
            
        }catch(Exception $e){
            return $e->getMessage();
        }
    }
}
