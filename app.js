const weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        
        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })

        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })
})

//SERVICES
weatherApp.service('cityService', function() {
    this.city = 'Miami ,US'
})


//CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {

    $scope.city = cityService.city

    $scope.$watch('city', function() {
        cityService.city = $scope.city
    })
    
}])

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams','cityService', function($scope, $resource, $routeParams, cityService) {

    $scope.city = cityService.city    

    $scope.weatherAPI = $resource('https://api.openweathermap.org/data/2.5/forecast', {callback: "JSON_CALLBACK", appid: '09fbb097e981c73f49e4b1014b726b1a' }, { get: { method: "JSONP" }});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city})
    
    $scope.convertToFahrenheit = function(degK) {
        return Math.round((1.8 * (degK - 273)) + 32 );
    };

    $scope.convertToDate = function( dt ) {
        return new Date(dt * 1000)
    };

    console.log($scope.weatherResult)
}]) 