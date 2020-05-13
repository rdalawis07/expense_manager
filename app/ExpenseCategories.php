<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExpenseCategories extends Model
{
    //
    protected $table = 'expense_categories';
    protected $fillable = [
        'name',
        'description',
        'updated_at',
    ];
}
