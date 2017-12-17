var app = angular.module('app', [
    'ngRoute',
    'hypeControllers'
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeController'
        })
        .when('/music', {
            templateUrl: 'partials/music.html',
            controller: 'MusicController'
        })
        .when('/music/:release', {
            templateUrl: 'partials/music.html',
            controller: 'MusicController'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}]);
