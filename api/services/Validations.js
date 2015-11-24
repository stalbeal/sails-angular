/*Metodo que verifica si el atributo recibido es null,
 *de serlo retorna N/A*/
exports.isNull = function(attribute) {

    var result;
    if (!attribute || attribute == "") {
        result = "N/A";
    } else {
        result = attribute;
    }
    return result;
};
/*
 *Metodo que verifica el largo del
 *nombre de usuario y la contraseña
 */
exports.length = function(username, password) {

    if (username.length < 6 || password.length < 6) {
        return true;
    } else {
        return false;
    }

};
/*
 *Metodo que verifica si las contraseñas
 *ingresadas son iguales
 */
exports.passwordEquals = function(password, passwordConfirmation) {

    if (!password || !passwordConfirmation || password != passwordConfirmation) {
        return true
    }
    return false;

};