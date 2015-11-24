/**
 * StateController
 *
 * @description :: Server-side logic for managing states
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    new: function(req, res, next) {
        Country.find(function(err, countries) {
            return res.view({
                countries: countries
            });
        });

    },
    create: function(req, res, next) {
        var stateObj = {
            name: req.param('name'),
            country: req.param('country')
            //description: req.param('description')
        }
        State.create(stateObj, function stateCrated(err, state) {
            if (err) {
                req.session.flash = {
                    err: sails.errorMessage(err)
                }
                return res.redirect('/state/new');
            }
            return res.redirect('/state/show/' + state.id);
        });
    },
    edit: function(req, res, next) {
        State.findOne(req.param('id'), function stateFounded(err, state) {
            if (err) {
                return next(err);
            }
            return res.view({
                state: state
            });
        });
    },
    update: function(req, res, next) {
        var stateObj = {
            name: req.param('name')
            //description: req.param('description')
        }
        State.update(req.param('id'), stateObj, function stateCrated(err, state) {
            if (err) {
                req.session.flash = {
                    err: sails.errorMessage(err)
                }
                return res.redirect('/state/edit');
            }
            return res.redirect('/state/show/' + state[0].id);
        });
    },
    show: function(req, res, next) {
        State.findOne(req.param('id'), function stateFounded(err, state) {
            if (err) {
                return next(err);
            }
            return res.view({
                state: state
            });
        });
    },
    index: function(req, res, next) {
        State.find(function stateFounded(err, states) {
            if (err) {
                return next(err);
            }
            return res.view({
                states: states
            });
        });
    },
    /*Retorna todos los departamentos en la base de datos
     **/
    view: function(req, res, next) {
        State.find().sort({
            name: 'asc'
        }).exec(function(err, states) {

            if (err) {
                var response = {
                    message: err.status
                }
                return res.json(response);
            }

            return res.json(states);

        });
    }
};