/*
 *Metodo que valida el si el atributo recibido es nulo
 *en caso de serlo retorna a la vista de error
 */
exports.view = function(attribute, next) {

    if (attribute == undefined || attribute == null || attribute == "") {
        var err = new Error();
        err.status = 404;

        return next(err);
    } else {
        return true;
    }
};

/*
 *Metodo que se empleapara responder los json
 */
exports.json = function(err, attribute) {
    var response = {
        message: err,
        result: attribute
    }
    return response;
};