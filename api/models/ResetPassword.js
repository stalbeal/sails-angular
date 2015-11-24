/**
 * ResetPassword.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        /*Código generado*/
        code: {
            type: 'string',
            required: true
        },
        /*usuario al que se le asocia el código*/
        user: {
            type: 'string',
            required: true
        }
    }
};