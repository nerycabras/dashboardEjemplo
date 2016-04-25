var a=angular.module('resumenModule',['ui.router']);
a.config(['$stateProvider', '$urlRouterProvider',function(
	$stateProvider, $urlRouterProvider) {
	$stateProvider
        .state('resumen1', {
            url: "/private/resumen/",
          	templateUrl:'/private/resumen/index.html'
        })
        .state('resumen2', {
            url: "/private/resumen/general",
            templateUrl:"/resumen/index.html"
        })
}])