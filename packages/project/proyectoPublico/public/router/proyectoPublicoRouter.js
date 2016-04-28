angular.module('proyectoPublico',['ui.router','ui.bootstrap']);
angular.module('proyectoPublico').config(['$stateProvider', '$urlRouterProvider',function(
	$stateProvider, $urlRouterProvider) {
	$stateProvider
        .state('login', {
            url: "/",
          	templateUrl:'login.html'
        })
}])