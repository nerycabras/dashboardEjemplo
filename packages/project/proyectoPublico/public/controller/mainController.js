angular.module('mainModule').controller('mainController', ['$scope',
	  $scope.class = "red";
	  $scope.changeClass = function(){
	    if ($scope.class === "red")
	      $scope.class = "blue";
	    else
	      $scope.class = "red";
	  };
]);

