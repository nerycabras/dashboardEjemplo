angular.module('mainModule',[]).config(['$stateProvider', '$urlRouterProvider',function(
	$stateProvider, $urlRouterProvider) {
	$stateProvider
            .state("main", {
                url: "/",
                templateUrl: '../assets/index.html',
                controller: 'mainController'
            });
}])