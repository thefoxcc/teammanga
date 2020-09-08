<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'PizzaReader') }}</title>

    <!-- Scripts -->
    <script type="text/javascript">
        const BASE_URL = "{{ config('app.url') }}"
        const API_BASE_URL = "{{ config('app.url') . 'api'}}"
    </script>
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{ asset('js/card-search.js') }}" defer></script>
    <script src="{{ asset('js/frontend.js') }}" defer></script>
    <script src="{{ asset('js/jquery.touchSwipe.min.js') }}" defer></script>
    <script src="{{ asset('js/reader.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/frontend.css') }}" rel="stylesheet">
    <link href="{{ asset('css/reader.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <nav id="header" class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container px-lg-0">
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ config('app.name', 'PizzaReader') }}
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <router-link to="/comics" class="nav-link">Comics</router-link>
                        </li>
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto col-4 pr-0">
                        <div style="width: 100%">
                            <input id="nav-filter" class="form-control mr-sm-2 card-search"
                                   type="search" placeholder="Filter" aria-label="Filter" name="filter"
                                   style="display: none" autocomplete="off">
                            <input id="nav-search" type="search" placeholder="Search comic" aria-label="Search comic"
                                   name="search" class="form-control mr-sm-2"
                                   style="display: none" autocomplete="off">
                            <div id="results-box" style="display: none">prova</div>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
        <main class="container-lg p-0 overflow-hidden">
            <router-view></router-view>
        </main>
    </div>
</body>
</html>
