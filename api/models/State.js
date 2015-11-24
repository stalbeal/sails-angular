/**
 * State.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        /*Nombre del departamento*/
        name: {
            type: 'string',
            required: true
        },
        /*Relación con la clase city*/
        cities: {
            collection: 'City',
            via: 'state'
        },
        /*Relación con la clase country*/
        country: {
            model: 'Country'
        },
        /*Relación con la clase location*/
        location: {
            collection: 'Location',
            via: 'state'
        }
    }
};