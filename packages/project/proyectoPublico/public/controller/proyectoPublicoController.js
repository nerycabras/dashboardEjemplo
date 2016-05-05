
angular.module('proyectoPublico').controller('loginController', ['$scope', '$http', '$q', 'callAsyncHttpService', function ($scope, $http, $q, callAsyncHttpService) {
  // calling our submit function.
  $scope.user = {};
  $scope.submitForm = function () {
    callAsyncHttpService.async('GET', '/webapi/proyectoPublico/login', $scope.user)
      .then(
      function (result) {
        var retorno = callAsyncHttpService.obtenerDatos();
        console.log(retorno);
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
    callAsyncHttpService.async('POST', '/webapi/proyectoPublico/login', $scope.user)
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

}]);

