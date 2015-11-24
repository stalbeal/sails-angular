/**
 * Establishment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        name: {
            type: 'string',
            required: true
        },
        /*dirección asociada a la ubicacion*/
        address: {
            type: 'string',
            required: true
        },
        /*latitud*/
        lat: {
            type: 'float'
        },
        /*longitud*/
        lng: {
            type: 'float'
        },
        /*barrio*/
        neighborhood: {
            type: 'string'
        },
        /*relacion con la clase city*/
        city: {
            model: 'City'
        },
        /*relacion con la clase state*/
        state: {
            model: 'State'
        },
        /*relacion con la clase country*/
        country: {
            model: 'Country'
        }

    }
};