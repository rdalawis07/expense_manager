<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use App\ExpenseCategories as ExpenseCategories;

class ExpenseCategoryController extends Controller
{
    //
    //
    public function index(){
        $expCategory = ExpenseCategories::all();
        return $expCategory;
    }


    public function create(Request $request){
        try {
            $expCategory = new ExpenseCategories;
            $expCategory->name = strtoupper($request->Input('name'));
            $expCategory->description = $request->Input('description');
            $expCategory->save();

            return $this->index();
        }catch(Exception $e){
            return $e->getMessage();
        }
    }


    public function update(Request $request){
        try{
            $expCategory = ExpenseCategories::find($request->Input('id'));
            $expCategory->name = strtoupper($request->Input('name'));
            $expCategory->description = strtoupper($request->Input('description'));
            $expCategory->save();

            return $this->index();
        }catch(Exception $e){
            return $e->getMessage();
        }
    }

    public function delete(Request $request){
        //
        try{
            $expCategory = ExpenseCategories::find($request->Input('id'));
            $expCategory->delete();

            return $this->index();
        }catch(Exception $e){
            return $e->getMessage();
        }
    }
}
