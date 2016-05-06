angular.module('proyectoPublico').factory('callAsyncHttpService', function ($http, $q) {
    var deffered = $q.defer();
    var datosRetorno = {};  
    var servicioActual = {};

    
    servicioActual.async = function (tipoPeticion,urlWebApi,datosPeticion) {
        console.log("datos enviar------------------->");
        console.log(datosPeticion);
        return $http({
            method: tipoPeticion,
            url: urlWebApi,
            data: datosPeticion, //forms user object
            headers: { 'Content-Type': 'application/json' }
        })
            .success(function (data, status, headers, config) {
                datosRetorno.data=data;
                datosRetorno.status=status;
                datosRetorno.headers=headers;
                datosRetorno.config=config;
                deffered.resolve();
                return deffered.promise;
            })
            .error(function (data, status, headers, config) {
                datosRetorno.data=data;
                deffered.reject(response);
                return deffered.promise;
            });
    };
    servicioActual.obtenerDatos=function(){
        return datosRetorno;
    }
    return servicioActual;
});