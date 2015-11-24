/**
 * Admin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        /*Nombre completo*/
        fullName: {
            type: 'string',
            required: true
        },
        /*Teléfono celular*/
        mobile: {
            type: 'string'
        },
        /*E-mail*/
        email: {
            type: 'string',
            required: true,
            unique: true
        },
        /*Nombre de usuario*/
        username: {
            type: 'string',
            required: true,
            unique: true
        },
        /*Contraseña, será null*/
        password: {
            type: 'string'
        },
        /*Confirmación de la contraseña, será null*/
        passwordConfirmation: {
            type: 'string'
        },
        /*Dirección*/
        address: {
            type: 'string'
        },
        /*Contraseña encriptada*/
        encryptedPassword: {
            type: 'string'
        },

        /*Elimina del modelo cuando es llevado
         a JSON los datos que estan en delete*/
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj._csrf;
            delete obj.passwordConfirmation;
            delete obj.encryptedPassword;
            return obj;

        }
    },
    /*metodo antes de crear el admin con el cual se comparan las
     *contraseñas ingresadas, se verifican que sean iguales
     *y se procede a encriptar, recibe un objeto de tipo usuario*/
    beforeCreate: function(values, next) {
        var password = values.password;
        var passwordConfirmation = values.passwordConfirmation;
        if (!password || !passwordConfirmation || password != passwordConfirmation) {
            var passwordDoesNotMatchError = {
                message: 'Las Contraseñas no son iguales, verifique'
            }
            return next({
                err: passwordDoesNotMatchError
            });
        }
        /*Usa el modulo bcrypt*/
        sails.bcrypt.hash(values.password, 512, function passwordEncrypted(err, encryptedPassword) {
            values.password = null;
            values.passwordConfirmation = null;
            values.encryptedPassword = encryptedPassword;

            next();
        });
    }


};