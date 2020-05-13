<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
        <title> Expense Manager </title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <script>window.Laravel = { csrfToken: '{{ csrf_token() }}' } </script>

    </head>
    <body>
        <div id="app">
            <router-view/>
        </div>

         @if(app()->environment('production'))
        <!-- This used for just refresh to update apps.js, 
        just make sure that the 'npm run prod' is aleady run and 
        change APP_ENV=production to used cache busting -->
        <script src="{{ mix('js/app.js') }}"></script> 
        @else
        <script src="{{ asset('js/app.js') }}"></script>
        @endif
    </body>
</html>
