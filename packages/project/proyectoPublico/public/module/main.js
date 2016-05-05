angular.module('proyectoPublico').factory('callBack', function($http, $q) {
  var deffered = $q.defer();
  var data = [];  
  var myService = {};

  myService.async = function() {
    $http.get('test.json')
    .success(function (d) {
      data = d;
      console.log(d);
      deffered.resolve();
    });
    return deffered.promise;
  };
  myService.data = function() { return data; };

  return myService;
});