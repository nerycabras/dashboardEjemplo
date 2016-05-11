
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

  }]).controller('altaUsuarioController', ['$scope', 'callAsyncHttpService', '$uibModal', '$log', '$window',function ($scope, callAsyncHttpService, $uibModal, $log,$window) {

    $scope.user = {};
    $scope.mensajeError="";
    $scope.alerts = [];
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    $scope.submitForm = function (size) {
      $scope.alerts = [];
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'confirmarModalHttp',
        controller: 'confirmarModalHttpController',
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
        var datosRegresados=datosRetorno.data;
        $log.info("Datos retorno ---------");
         console.log(datosRetorno);
        if(datosRegresados.estatus==3){
          $scope.alerts.push({ type: 'danger', msg: datosRegresados.mensaje });
        }else if(datosRegresados.estatus==1){
          $window.location.href = 'http://localhost:3000/public/proyectoPublico/';
        }
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


