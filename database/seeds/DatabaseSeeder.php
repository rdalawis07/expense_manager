<?php

use Illuminate\Database\Seeder;
use App\User as User;
use App\Role as Role;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(RolesTableSeeder::class);
    }
}


class UsersTableSeeder extends Seeder{

    public function run(){
        DB::table('users')->delete();

        User::create(['name' => 'Sample Admin',
            'email' => 'admin@purplebug.com',
            'password' => Hash::make('abcd1234'),
            'role_id' => 1,
        ]);

        User::create(['name' => 'Sample User',
            'email' => 'user@purplebug.com',
            'password' => Hash::make('abcd1234'),
            'role_id' => 2,
        ]);
    }
}


class RolesTableSeeder extends Seeder{
    public function run(){
        DB::table('roles')->delete();

        Role::create(['name' => 'ADMINISTRATOR',
            'description' => 'super user',
        ]);

        Role::create(['name' => 'USER',
            'description' => 'can add expenses',
        ]);
    }
}
