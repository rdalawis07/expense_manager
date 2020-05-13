<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use App\Role as Role;

class RoleController extends Controller
{
    //
    public function index(){
        $role = Role::all();
        return $role;
    }


    public function create(Request $request){
        try {
            $role = new Role;
            $role->name = strtoupper($request->Input('name'));
            $role->description = $request->Input('description');
            $role->save();

            return $this->index();
        }catch(Exception $e){
            return $e->getMessage();
        }
    }


    public function update(Request $request){
        try{
            $role = Role::find($request->Input('id'));
            $role->name = strtoupper($request->Input('name'));
            $role->description = strtoupper($request->Input('description'));
            $role->save();

            return $this->index();
        }catch(Exception $e){
            return $e->getMessage();
        }
    }

    public function delete(Request $request){
        //
        try{
            $role = Role::find($request->Input('id'));
            $role->delete();

            return $this->index();
        }catch(Exception $e){
            return $e->getMessage();
        }
    }
}
