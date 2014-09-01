angular.module('app', ['ngRoute', 'ngResource']);

angular.module('app').config(function($routeProvider, $locationProvider){
   $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {templateUrl: 'partials/main/main', controller: 'mvMainCtrl' })
});