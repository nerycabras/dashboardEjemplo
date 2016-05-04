
angular.module('proyectoPublico').controller('loginController', ['$scope','$http', function($scope,$http){

	 $scope.user = {nombre:'nery',correo:'nery@gmail.com'};
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

}]);

