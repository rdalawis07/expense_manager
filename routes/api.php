<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//User Route
Route::get('/user-login', 'UserController@login'); //fetch specific user
Route::get('/users', 'UserController@index'); //fetch all users
Route::post('/users/create', 'UserController@create'); //insert user
Route::put('/users/update', 'UserController@update'); //update user
Route::put('/users/editpassword', 'UserController@editpassword');
Route::delete('/users/delete', 'UserController@delete'); //delete user
//Role Route
Route::get('/roles', 'RoleController@index'); //fetch role
Route::post('/roles/create', 'RoleController@create'); //insert role
Route::put('/roles/update', 'RoleController@update'); // update role
Route::delete('/roles/delete', 'RoleController@delete'); // delete role
//Expense Categories Route
Route::get('/expensecategories', 'ExpenseCategoryController@index'); //fetch expense category
Route::post('/expensecategories/create', 'ExpenseCategoryController@create'); //insert expense category
Route::put('/expensecategories/update', 'ExpenseCategoryController@update'); //update expense category
Route::delete('/expensecategories/delete', 'ExpenseCategoryController@delete');// delete expense category
//Expenses Route
Route::get('/expensegroup/{user_id}', 'ExpensesController@fetchGroup'); //fetch expenses for dashboard
Route::get('/expenses/{user_id}', 'ExpensesController@index'); //fetch expenses
Route::post('/expenses/create', 'ExpensesController@create'); //insert expenses
Route::put('/expenses/update', 'ExpensesController@update'); //update expenses
Route::delete('/expenses/delete', 'ExpensesController@delete');// delete expenses