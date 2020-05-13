<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Expenses extends Model
{
    //
    protected $table = 'expenses';
    protected $fillable = [
        'user_id',
        'expense_category_id',
        'amount',
        'entry_date',
        'updated_at',
    ];

    public static function fetchSpecific($user_id){

        $expenses = DB::select("SELECT a.id, a.expense_category_id, b.name as expense_category_name, a.amount, a.entry_date, a.created_at 
        FROM expenses as a 
        INNER JOIN expense_categories as b ON a.expense_category_id = b.id WHERE a.user_id = '$user_id' ORDER BY a.id ASC");    
        
        return $expenses;
    }

    public static function fetchGroup($user_id){
        $expenses = DB::select("SELECT a.expense_category_id, b.name as expense_category_name, SUM(a.amount) as total_amount 
        FROM expenses as a INNER JOIN expense_categories as b ON a.expense_category_id = b.id 
        WHERE a.user_id = '$user_id' 
        GROUP BY a.expense_category_id ORDER BY a.expense_category_id ASC");    
        
        return $expenses;
    }
    
}
