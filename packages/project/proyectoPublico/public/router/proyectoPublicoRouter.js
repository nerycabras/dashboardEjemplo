
angular.module('proyectoPublico').config(['$stateProvider', '$urlRouterProvider',function(
	$stateProvider, $urlRouterProvider) {
	$stateProvider
        .state('#', {
            url: "/index",
          	templateUrl:'indexPart.html'
        })
        .state('login', {
            url: "/login",
          	templateUrl:'login.html'
        })
        .state('crearUsuario', {
            url: "/crearUsuario",
          	templateUrl:'usuarioCreate.html'
        })

  
  $urlRouterProvider.when('', '/index');
}])