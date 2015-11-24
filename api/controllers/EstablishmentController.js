/**
 * EstablishmentController
 *
 * @description :: Server-side logic for managing establishments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    new: function(req, res) {
        Country.find(function countriesFound(err, countries) {
            State.find(function statesFound(err, states) {
                City.find(function citiesFound(err, cities) {
                    return res.view({
                        countries: countries,
                        states: states,
                        cities: cities
                    });
                });
            });
        });
    },
    create: function(req, res, next) {
        var params = req.params.all();
        delete params.submit;
        delete params.id;

        Establishment.create(params, function recordCreated(err, establishment) {
            if (err) {
                req.session.flash = {
                    err: sails.errorMessage(err)
                }
                return res.redirect('back');
            }

            req.session.flash = {
                err: 'Universidad creada exitosamente'
            }
            return res.redirect('back');

        });
    },
    indexMobile: function(req, res) {
        Establishment.find(function recordsFound(err, establishments) {
            if (err) return res.json(Response.json(err.status, null));
            return res.json(Response.json('600', establishments));
        });
    }

};