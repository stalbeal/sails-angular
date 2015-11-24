/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * Servicio para login
     */
    session: function(req, res) {
        return res.view({layout:'register'});
    },
    /**
     * Servicio para login de user
     */
    user: function(req, res) {
        var params = req.params.all();
        if (!params.username || !params.password) {
            req.session.flash = {
                err: 'Error de validación'
            }
            return res.redirect('back');
        }

        User.findOneByUsername(params.username, function userFound(err, userFound) {
            if (err) {
                return next(err);
            }
            if (!userFound) {
                req.session.flash = {
                    err: 'El usuario no existe'
                }
                return res.redirect('back');
            }


            sails.bcrypt.compare(params.password, userFound.encryptedPassword, function passwordsMatch(err, valid) {
                if (err) return next(err);
                if (!valid) {
                    req.session.flash = {
                        err: 'La contraseña no coincide'
                    }
                    return res.redirect('back');
                }
                if (req.session.admin != null || req.session.admin != undefined) {
                    req.session.admin = null;
                }
                req.session.user = userFound;
                req.session.authenticated = true;

                return res.redirect('/user/show/' + userFound.id);


            });
        });
    },


    /**
     * Servicio para login de admin
     */
    admin: function(req, res, next) {
        var params = req.params.all();
        if (!params.username || !params.password) {
            req.session.flash = {
                err: 'Error de validación'
            }
            return res.redirect('back');
        }

        Admin.findOneByUsername(params.username, function adminFound(err, adminFound) {
            if (err) {
                return next(err);
            }
            if (!adminFound) {
                req.session.flash = {
                    err: 'El usuario no existe'
                }
                return res.redirect('back');
            }


            sails.bcrypt.compare(params.password, adminFound.encryptedPassword, function passwordsMatch(err, valid) {
                if (err) return next(err);
                if (!valid) {
                    req.session.flash = {
                        err: 'La contraseña no coincide'
                    }
                    return res.redirect('back');
                }
                if (req.session.user != null || req.session.user != undefined) {
                    req.session.user = null;
                }
                req.session.admin = adminFound;
                req.session.authenticated = true;

                return res.redirect('/admin/show/' + adminFound.id);


            });
        });
    },
    /**
     *Verifica la información enviada por un usuario para realizar
     *login desde el móvil
     */
    mobile: function(req, res, next) {
        User.findOne({
            username: req.param('username')
        }).populateAll().exec(function(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.json(Response.json('601', null));
            } else {
                sails.bcrypt.compare(req.param('password'), user.encryptedPassword, function passwordsMatch(err, valid) {
                    if (err)
                        return res.json(Response.json(err.status, null));
                    if (!valid) {
                        return res.json(Response.json('602', null));
                    }

                    var userLogin = {
                        user: user.id
                    }
                    UserLogin.create(userLogin, function userLoginCreated(err, login) {
                        var error = "Alguna de la información que esta tratando de ingresar ya existe en la base de datos, por favor verifique";
                        if (err) {
                            var er = 'Alguna de la información que esta tratando de ingresar ya existe en la base de datos, por favor verifique';
                            if (sails.errorMessage(err) != er) {
                                return res.json(Response.json(err.status, null));
                            }
                        }
                        return res.json(Response.json('600', user));
                    });
                });
            }
        });
    },
    /**
     *Elimina la sesión web de los usuarios
     */
    destroy: function(req, res, next) {
        req.session.destroy();
        /******************agregar redireccion*/
        res.redirect('/login/session');
        /*************************/

    },
    /**
     *Cierra la sesión móvil de un usuario
     */
    destroySession: function(req, res, next) {
        //req.session.destroy();
        UserLogin.destroy({
            user: req.param('loggedUser')
        }).exec(function(err, login) {
            if (err) {
                return res.json(Response.json(err.status, null));
            }
            return res.json(Response.json('600', null));
        });
    }
};