/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /*
     *Crea un registro para para la clase
     */
    post: function(req, res, next) {
        var params = req.params.all();
        params.address = Validations.isNull(params.address);
        params.mobile = Validations.isNull(params.mobile);
        /*Se verifica la longitud de el nombre de usuario y contraseña*/
        if (Validations.length(params.username, params.password)) {
            return res.status(609);
        }
        /*Crea un registro de user con los parametros en params*/
        User.create(params, function created(err, user) {
            if (err) {
                return res.send(err.status, err);
            }
            return res.send(201, user);
        });
    },
    /*
     * Actualiza un registro desde la web
     */
    put: function(req, res, next) {
        var params = req.params.all();
        var id = params.id;
        delete params.submit;
        delete params.id;
        params.address = Validations.isNull(params.address);
        params.mobile = Validations.isNull(params.mobile);
        User.update(id, params, function recordUpdated(err, userU) {
            if (err) {
                return res.send(err.status, err);
            }
            User.findOne(id, function userFound(err, user) {
                return res.send(200, user);
            });
        });
    },
    /*
     * Retorna a la vista de show
     */
    get: function(req, res, next) {
        User.findOne(req.param('id'), function recordFounded(err, user) {
            if (err) {
                return res.send(err.status, err);
            }
            if (Response.view(user, next)) {

                return res.send(200, user);
            }
        });
    },
    
    /**
     * Muestra todos los registros ordenados por creación
     */
    getAll: function(req, res, next) {
        User.find().sort('createdAt')
            .exec(function recordsFounded(err, users) {
                if (err) {
                    return res.send(err.status, err);
                }
                User.count(function recordsCounted(err, userQuantity) {
                    if (err) {
                        res.status(err.status);
                        return res.json(err);
                    }
                    return res.send(200, users);
                    //return res.json({users: users,userQuantity: userQuantity});
                });
            });
    },
    /**
     *Elimina un registro de user
     * Implementar
     */
    destroy: function(req, res) {

    },
    /*
     * Cambia la imagen de un usuario
     */
    changeImage: function(req, res) {
        User.findOne({
            id: req.param('loggedUser')
        }).exec(function founded(err, user) {
            if (err) {
                return res.json(Response.json(err.status, null));
            }
            var obj = {
                userImage: req.param('image')
            }
            User.update(req.param('loggedUser'), obj, function updated(err, userUpdated) {
                if (err) {
                    return res.json(Response.json(err.status, null));
                }
                User.findOne({
                    id: req.param('loggedUser')
                }).populateAll().exec(function(err, userRes) {
                    if (err) {
                        return res.json(Response.json(err.status, null));
                    }
                    return res.json(Response.json('600', userRes));
                });
            });
        });
    },
    /*
     * Verifica la existencia de un usuario según su email
     */
    verifyUserByEmail: function(req, res, next) {
        User.findOne({
            email: req.param('email')
        }, function recordFound(err, user) {
            if (err) {
                return res.json(Response.json(err.status, null));
            }
            if (user != null || user != undefined) {
                UserLogin.findOne({
                    user: user.id
                }, function userLoginFound(err, loggedUser) {
                    if (loggedUser != null || loggedUser != undefined) {
                        return res.json(Response.json('600', user));
                    } else {
                        UserLogin.create({
                            user: user.id
                        }, function userLoginCreated(err, loggedUser) {
                            return res.json(Response.json('600', user));
                        });
                    }
                });
            } else {
                return res.json(Response.json('608', null));
            }
        });
    },
    /*
     * Retorna a la vista de restablecer contraseña de un usuario
     */
    resetpassword: function(req, res, next) {
        User.findOne(req.param('id'), function userFound(err, user) {
            if (err) {
                return next(err);
            }
            return res.view({
                user: user
            });
        });
    },
    /*
     * Asigna una nueva contraseña a un user
     */
    newPassword: function(req, res, next) {
        User.findOne({
            id: req.param('id')
        }).populateAll().exec(function(err, user) {
            if (err) {
                return next(err);
            }

            //Se encuentra el registro del codigo para
            //el cambio de la contraseña
            ResetPassword.findOne({
                code: req.param('code')
            }).exec(function(err, reset) {
                if (err) {
                    req.session.flash = {
                        err: sails.errorMessage(err)
                    }
                    return res.redirect('back');
                }
                var resedId = reset.id;
                if (!user) {
                    req.session.flash = {
                        err: 'Por favor verifique la url a la que esta accediendo'
                    }
                    return res.redirect('back');
                } else if (!reset) {
                    req.session.flash = {
                        err: 'El código ingresado es erroneo'
                    }
                    return res.redirect('back');
                } else {
                    if (req.param('username') == user.username) {
                        var password = req.param('passwordNew');
                        var passwordConfirmation = req.param('passwordConfirmation');
                        //console.log('contraseñas: '+ password+'; '+ passwordConfirmation);
                        if (Validations.passwordEguals(password, passwordConfirmation)) {
                            req.session.flash = {
                                err: 'Las contraseñas no son iguales, verifique'
                            }
                            return res.redirect('back');
                        }
                        sails.bcrypt.hash(password, 512, function passwordEncrypted(err, encryptedPassword) {
                            var encryptedpassword = encryptedPassword;

                            User.update(req.param('id'), {
                                encryptedPassword: encryptedpassword
                            }, function userUpdated(err, userResult) {
                                if (err) {
                                    req.session.flash = {
                                        err: sails.errorMessage(err)
                                    }
                                    return res.redirect('back');
                                }
                                //Se elimina el código existente
                                ResetPassword.destroy(resedId, function resetDestroyed(err, restDestroyed) {
                                    /*asignar redirect*********************/
                                    return res.redirect('/user/success');
                                    /**************************************/
                                });
                            });
                        });
                    } else {
                        req.session.flash = {
                            message: 'El nombre de usuario no coincide con la cuenta asociada a su correo, verifique'
                        }
                        return res.redirect('back');
                    }
                } //fin primer else
            });

        });
    },
    /*
     *!!!!!!!!!!!!!!!!Reescribir!! !!!!!!!!!!!!!!!!!!!
     *Retorna a la vista success despues de restablecer la contraseña
     */
    success: function(req, res, next) {
        res.view({
            layout: 'landing'
        });
    }
};