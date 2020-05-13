<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use App\Expenses as Expenses;

class ExpensesController extends Controller
{
    //
    public function index($user_id){
        $expenses = Expenses::fetchSpecific($user_id);
        return $expenses;
    }


    public function fetchGroup($user_id){
        $expenses = Expenses::fetchGroup($user_id);
        return $expenses;
    }

    public function create(Request $request){
        try {
            $expenses = new Expenses;
            $expenses->user_id = $request->Input('user_id');
            $expenses->expense_category_id = $request->Input('expense_category_id');
            $expenses->amount = $request->Input('amount');
            $expenses->entry_date = $request->Input('entry_date');
            $expenses->save();

            return $this->index($request->Input('user_id'));
        }catch(Exception $e){
            return $e->getMessage();
        }
    }


    public function update(Request $request){
        try{
            $expenses = Expenses::find($request->Input('id'));
            $expenses->user_id = $request->Input('user_id');
            $expenses->expense_category_id = $request->Input('expense_category_id');
            $expenses->amount = $request->Input('amount');
            $expenses->entry_date = $request->Input('entry_date');
            $expenses->save();

            return $this->index($request->Input('user_id'));
        }catch(Exception $e){
            return $e->getMessage();
        }
    }

    public function delete(Request $request){
        //
        try{
            $expenses = Expenses::find($request->Input('id'));
            $expenses->delete();

            return $this->index($request->Input('user_id'));
        }catch(Exception $e){
            return $e->getMessage();
        }
    }
}
