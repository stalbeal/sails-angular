/**
 * LandingPageController
 *
 * @description :: Server-side logic for managing LS
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `LController.create()`
     */
    create: function(req, res) {
        var params = req.params.all();
        HomePage.create({
            name: params.name,
            email: params.email
        }, function recordCreated(err, contact) {
            if (err) {
                req.session.flash = {
                    err: sails.errorMessage(err)
                }
                return res.redirect('/');
            }
            req.session.flash = {
                err: '¡Gracias por registrarte!</p>' +
                    '<p class="heading h2 center">Pronto recibirás noticias de helPet'
            }
            return res.redirect('/');

        });

    },

    landing: function(req, res) {
        res.view();
    },
    index: function(req, res) {
        HomePage.find(function recordFound(err, contacts) {
            return res.view({
                contacts: contacts
            });
        });
    },
    terms: function(req, res, next) {
        return res.view({
            layout: 'landing'
        });
    },
    utilities: function(req, res, next) {
        Pet.find().where({
            age: {
                '!': null
            }
        }).exec(function kkn(err, pets) {
            User.find(function jj(err, users) {

                var map = {};
                var isNot = [];

                for (var i = 0; i < users.length; i++) {

                    map[users[i].id] = users[i].id;
                };
                for (var j = 0; j < pets.length; j++) {
                    if (!(pets[j].user in map)) {
                        isNot.push({petId:pets[j].id, petName: pets[j].name, userId:pets[j].user});
                    }
                };

                return res.view({
                    errors: isNot
                });
            });
        });
    }

};