/**
 * CityController
 *
 * @description :: Server-side logic for managing cities
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    new: function(req, res, next) {
        State.find(function statesFonded(err, states) {
            if (err) {
                return next(err);
            }
            return res.view({
                states: states
            });
        });


    },
    /*Crea una nueva ciudad
     */
    create: function(req, res) {

        var city = {
            name: req.param('name'),
            state: req.param('stateId'),
            latitude: parseFloat(req.param('latitude')),
            longitude: parseFloat(req.param('longitude'))
        }

        City.create(city, function cityCreate(err, city) {
            if (err) {
                req.session.flash = {
                    err: sails.errorMessage(err)
                }
                return res.redirect('/city/new');
            }
            return res.redirect('/city/show/' + city.id);

        });

    },
    /*Retorna el registro de ciudad a editar a la vista
     **/
    edit: function(req, res) {
        City.findOne({
            id: req.param('id')
        }).populateAll().exec(function(err, city) {
            if (err) {

                return next(err);
            }
            /*State.find(function statesFonded (err, states) {
              if (err) {

                return next(err);
            } 
            */

            if (city != undefined) {
                return res.view({
                    city: city
                    //states:states
                });
            } else {
                var err = new Error();
                err.status = 404;

                return next(err);
            }
            //});
        });
    },
    /*Actualiza un registro de ciudad 
     **/
    update: function(req, res, next) {

        var city = {
            name: req.param('name'),
            //state: req.param('state'),
            latitude: req.param('latitude'),
            longitude: req.param('longitude'),
            state: req.param('stateId')
        }

        City.update(req.param('id'), city, function cityUpdate(err, city) {
            if (err) {
                req.session.flash = {
                    err: sails.errorMessage(err)
                }
            }
            return res.redirect('/city/show/' + req.param('id'));

        });

    },
    /*Retorna todas las ciudades en la base de datos
     **/
    index: function(req, res, next) {
        City.find().sort({
            name: 'asc'
        }).exec(function(err, cities) {
            if (err) {

                return next(err);
            }

            return res.view({
                cities: cities
            });

        });
    },
    /*Retorna todas las ciudades en la base de datos
     **/
    view: function(req, res, next) {

        Country.find().sort({
            name: 'asc'
        }).exec(function(err, countries) {
            State.find().sort({
                name: 'asc'
            }).exec(function(err, states) {
                City.find().sort({
                    name: 'asc'
                }).exec(function(err, cities) {

                    if (err) {
                        return res.json(Response.json(err.status, null));
                    }

                    var response = {
                        countries: countries,
                        states: states,
                        cities: cities
                    }

                    return res.json(Response.json('600', response));
                });
            });

        });
    },
    /*Retorna el registro de una ciudad a la vista show
     **/
    show: function(req, res, next) {
        City.findOne({
            id: req.param('id')
        }).exec(function(err, city) {
            if (err) {

                return next(err);
            }

            if (Response.view(city, next)) {
                return res.view({
                    city: city
                });
            }
        });
    }

};