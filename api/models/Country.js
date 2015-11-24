/**
 * Country.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        /*Nombre*/
        name: {
            type: 'string',
            required: true
        },
        /*Descripción*/
        description: {
            type: 'string'
        },
        /*Relación con la clase state*/
        state: {
            collection: 'State',
            via: 'country'
        },
        /*Relación con la clase location*/
        location: {
            collection: 'Location',
            via: 'country'
        }


    }
};