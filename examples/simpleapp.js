
var app = angular.module('simpleapp', ['ngRoute', 'sdr']);

app.controller(
    'simpleController',
    function ($scope, $location, $http) {
        $scope.currentUrl = $location.absUrl();
    }
);

app.controller(
    'weatherController',
    function (weatherData, $scope) {
        $scope.weather = weatherData;
    }
);

var weatherTemplate = '<h2>Weather for {{weather.name}}</h2><pre>{{weather | json}}</pre>';

app.config(
    function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.when(
            '/weather',
            {
                template: '<h2>Select City</h2><ul><li><a href="/weather/sf">San Francisco</a></li><li><a href="/weather/ny">New York</a></li></ul>'
            }
        );
        $routeProvider.when(
            '/weather/sf',
            {
                template: '<h2>Weather for {{weather.name}}</h2><pre>{{weather | json}}</pre>',
                resolve: {
                    weatherData: function ($http) {
                        return $http.get(
                            'http://api.openweathermap.org/data/2.5/weather?q=San%20Francisco,%20CA,%20US'
                        ).then(function (resp) { return resp.data; });
                    }
                },
                controller: 'weatherController'
            }
        );
        $routeProvider.when(
            '/weather/ny',
            {
                template: weatherTemplate,
                resolve: {
                    weatherData: function ($http) {
                        return $http.get(
                            'http://api.openweathermap.org/data/2.5/weather?q=New%20York,%20NY,%20US'
                        ).then(function (resp) { return resp.data; });
                    }
                },
                controller: 'weatherController'
            }
        );
        $routeProvider.otherwise(
            {
                template: '<a href="/weather">Weather</a>'
            }
        );
    }
);
