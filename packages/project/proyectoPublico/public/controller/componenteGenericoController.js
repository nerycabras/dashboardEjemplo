angular.module('componenteGenericoModulo')
.controller('confirmarModalHttpController', [
  '$scope', '$uibModalInstance', 'message','callAsyncHttpService',function ($scope, $uibModalInstance, message,callAsyncHttpService) {
    
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
    $scope.oki = function () {
      console.log(message);
      callAsyncHttpService.async(message.metodo, message.url, message.datos)
        .then(
        function (result) {
          var retorno = callAsyncHttpService.obtenerDatos();
          $uibModalInstance.close(retorno);
        },
        function (error) {
          // handle errors here
          console.log(error);
        }
        );
    };
    
  }])
  .controller('modalSimpleSuccesController', [
  '$scope', '$uibModalInstance',function ($scope, $uibModalInstance) {    
    $scope.ok = function () {
      $uibModalInstance.close('ok');
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
  }])
  
  ;