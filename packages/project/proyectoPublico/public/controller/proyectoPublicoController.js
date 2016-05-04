
angular.module('proyectoPublico').controller('loginController', ['$scope','$http', function($scope,$http){
      // calling our submit function.
        $scope.user = {};
        $scope.submitForm = function() {
        // Posting data to php file
        $http({
          method  : 'GET',
          url     : '/webapi/proyectoPublico/login',
          data    : $scope.user, //forms user object
          headers : { 'Content-Type': 'application/json' } 
         })
          .success(function(data) {
            if (data.errors) {
              // Showing errors.
              $scope.errorName = data.errors.name;
              $scope.errorUserName = data.errors.username;
              $scope.errorEmail = data.errors.email;
            } else {
              $scope.message = data.message;
            }
          });
        };

}]).controller('altaUsuarioController', ['$scope','$http', function($scope,$http){

	 $scope.user = {};
      // calling our submit function.
        $scope.submitForm = function() {
        // Posting data to php file
        $http({
          method  : 'POST',
          url     : '/webapi/proyectoPublico/login',
          data    : $scope.user, //forms user object
          headers : { 'Content-Type': 'application/json' } 
         })
          .success(function(data) {
            $scope.errorUsuario=null;
            if (data.error) {
              console.log("errror--->");
              console.log(data.error);
              // Showing errors.
              $scope.errorUsuario = data.error;
            } else {
              $scope.message = data.message;
            }
          });
        };

}]);

