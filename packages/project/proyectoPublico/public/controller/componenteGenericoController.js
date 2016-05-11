angular.module('componenteGenericoModulo')
.controller('ModalConfirmController', [
  '$scope', '$uibModalInstance', 'message','callAsyncHttpService',function ($scope, $uibModalInstance, message,callAsyncHttpService) {
    /*
    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item);
    };*/

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
    $scope.ok = function () {
      console.log('<---- Mensaje a enviar--->' );
      console.log(message);
      console.log('<---- Mensaje a enviar--->' );
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
    
  }]);