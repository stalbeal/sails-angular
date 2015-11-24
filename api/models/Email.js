/**
 * Email.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        /*De donde se envia el correo*/
        emailFrom: {
            type: 'string',
            required: true
        },
        /*contraseña de la direccion de correo que envia los correos*/
        password: {
            type: 'string',
            required: true
        },
        /*asunto del correo*/
        subject: {
            type: 'string',
            required: true
        },
        /*nombre de quien envia el correo*/
        from: {
            type: 'string',
            required: true
        },
        /*contenido del correo*/
        body: {
            type: 'string',
            required: true
        }
    }
};