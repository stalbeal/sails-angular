/**
 * UserLogin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
    	/*Usuario que se loguea*/
        user: {
            type: 'string',
            required: true,
            unique: true
        }
    }
};