
angular.module('proyectoPublico').
controller('loginController', ['$scope', '$http', '$q', 'callAsyncHttpService','$window', function ($scope, $http, $q, callAsyncHttpService,$window) {
  // calling our submit function.
  $scope.user = {};
  $scope.submitForm = function () {
    callAsyncHttpService.async('POST', '/webapi/proyectoPublico/login', $scope.user)
      .then(
      function (result) {
        var retorno = callAsyncHttpService.obtenerDatos();
        $window.location.href = 'http://localhost:3000/public/proyectoPublico/';
      },
      function (error) {
        // handle errors here
        console.log(error);
      }
      );
  };

}]).controller('altaUsuarioController', ['$scope', '$http', '$q', 'callAsyncHttpService',function ($scope, $http,  $q, callAsyncHttpService) {

  $scope.user = {};
  // calling our submit function.
  $scope.submitForm = function () {
    callAsyncHttpService.async('POST', '/webapi/proyectoPublico/altaUsuario', $scope.user)
      .then(
      function (result) {
        var retorno = callAsyncHttpService.obtenerDatos();
        console.log(retorno);
      },
      function (error) {
        // handle errors here
        console.log(error);
      });


  };

}])
.controller('headController', ['$scope', '$http', '$q', 'callAsyncHttpService','$window',function ($scope, $http,  $q, callAsyncHttpService,$window) {
  // calling our submit function.
  $scope.showComponet=false;
  $scope.permiso='nada';
  $scope.usuario={};
  $scope.consultarDatos = function () {
    callAsyncHttpService.async('GET', '/webapi/proyectoPublico/security',{})
      .then(
      function (result) {
        var retorno = callAsyncHttpService.obtenerDatos();
        $scope.datos=retorno.data;
        $scope.logged=$scope.datos.logged;
        console.log('Entro login'+ $scope.logged);
        if($scope.datos.logged===undefined){
          $scope.showComponet=true;
        } if($scope.datos.logged==true){
          $scope.showComponet=false;
          $scope.usuario=$scope.datos.usuario;
        }
        else{
          $scope.showComponet=true;
        }

      },
      function (error) {
        console.log(error);
      });


  };
  
    $scope.logout = function () {
    callAsyncHttpService.async('POST', '/webapi/proyectoPublico/logout', $scope.user)
      .then(
      function (result) {
        $window.location.href = 'http://localhost:3000/public/proyectoPublico/';
      },
      function (error) {
        console.log(error);
      });


  };

}]);
;

