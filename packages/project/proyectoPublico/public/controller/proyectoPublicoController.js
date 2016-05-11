
angular.module('proyectoPublico').
  controller('loginController', ['$scope', 'callAsyncHttpService', '$window', '$uibModal', '$log', function ($scope, callAsyncHttpService, $window, $uibModal, $log) {
    $scope.user = {};
      $scope.submitForm = function () {
        callAsyncHttpService.async('POST', '/webapi/proyectoPublico/login', $scope.user)
          .then(
          function (result) {
            var retorno = callAsyncHttpService.obtenerDatos();
            $window.location.href = 'http://localhost:3000/public/proyectoPublico/';
          },
          function (error) {
            console.log(error);
          }
          );
      };

  }]).controller('altaUsuarioController', ['$scope', 'callAsyncHttpService', '$uibModal', '$log', function ($scope, callAsyncHttpService, $uibModal, $log) {

    $scope.user = {};
    // calling our submit function.
    /*$scope.submitForm = function () {
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
    };*/
    
    
    

    $scope.submitForm = function (size) {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'confirmarModalHttp',
        controller: 'ModalConfirmController',
        size: size,
        resolve: {
          message: function () {
            return {
              datos:$scope.user,
              metodo:"POST",
              url:"/webapi/proyectoPublico/altaUsuario"
            }  
          }
        }
      });
      //metodo que se ejecuta y retornar los datos de la consulta
      modalInstance.result.then(function (datosRetorno) {
        $log.info("dato seleccionado" + datosRetorno);
        $window.location.href = 'http://localhost:3000/public/proyectoPublico/';
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };






  }])
  .controller('headController', ['$scope', 'callAsyncHttpService', '$window', function ($scope, callAsyncHttpService, $window) {
    // calling our submit function.
    $scope.showComponet = false;
    $scope.permiso = 'nada';
    $scope.usuario = {};
    $scope.consultarDatos = function () {
      callAsyncHttpService.async('GET', '/webapi/proyectoPublico/security', {})
        .then(
        function (result) {
          var retorno = callAsyncHttpService.obtenerDatos();
          $scope.datos = retorno.data;
          $scope.logged = $scope.datos.logged;
          console.log('Entro login' + $scope.logged);
          if ($scope.datos.logged === undefined) {
            $scope.showComponet = true;
          } if ($scope.datos.logged == true) {
            $scope.showComponet = false;
            $scope.usuario = $scope.datos.usuario;
          }
          else {
            $scope.showComponet = true;
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

  }])
  ;


