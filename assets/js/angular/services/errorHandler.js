'use strict';
var errorHandler = angular.module('errorHandler', []);
errorHandler.factory('errorService', function() {
    return {
        error: function(err) {

            var errJson = err;

            switch (err.status) {
                case 400:
                    var attributes = errJson.data.invalidAttributes;
                    var str = "";
                    for (var i = 0; i < Object.keys(attributes).length; i++) {
                        str = Object.keys(attributes)[i] + ", " + str;
                    }
                    if (str.length > 1) {
                        str = str.substring(0, str.length - 2);
                    }
                    return 'Informacion invalida, verifique por favor los siguientes atributos: ' + str;

                case 401:
                    return 'No esta autorizado para realizar esta acción';

                case 403:
                    return 'Vaya, la acción que intentas realizar no esta permitida';

                case 404:
                    return 'El recurso solicitado no ha sido encontrado';

                case 500:                
                        return 'Error del sistema, por favor intentalo de nuevo';                   

                case 503:
                    return 'Servicio no disponible';

                default:
                    return 'Vaya, parece que ha ocurrido un error. Por favor intenta más tarde';
            }


        }
    };
});