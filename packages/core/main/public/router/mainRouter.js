var a=angular.module('mainModule',['ui.router','resumenModule']);
a.config(['$stateProvider', '$urlRouterProvider',function(
	$stateProvider, $urlRouterProvider) {
	$stateProvider
        .state('basquet', {
            url: "/private/main/basquet",
          	templateUrl:'basquet.html'
        })
        .state('fut', {
            url: "/private/main/fut",
            templateUrl:"futbol.html"
        })
}])