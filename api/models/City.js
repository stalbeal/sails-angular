/**
 * City.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        /*Nombre de la ciudad o municipio*/
        name: {
            type: 'string',
            required: true
        },
        /*Relacion con la clase location*/
        location: {
            collection: 'Location',
            via: 'city'
        },
        /*Latitud de la ciudad*/
        latitude: {
            type: 'float',
            required: true
        },
        /*longitud de la ciudad*/
        longitude: {
            type: 'float',
            required: true
        },
        /*Relacion con la clase state*/
        state: {
            model: 'State',
            required: true
        }
    }
};