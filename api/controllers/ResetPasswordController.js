/**
 * ResetPasswordController
 *
 * @description :: Server-side logic for managing resetpasswords
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    /*Crea un registro con la información relacionada para restablecer 
     *la contraseña de un usuario
     */
    create: function(req, res) {


        if (req.param('email') != null) {
            User.findOne({
                email: req.param('email')
            }).exec(function(err, userFounded) {
                if (err) {
                    return res.json(Response.json(err.status,null));
                }

                if (userFounded != null) {
                    var number = Random.digit();
                    var reset = {
                        code: number,
                        user: userFounded.id
                    }
                    Email.find(function emailFounded(err, email) {
                        if (err) {
                            return res.json(Response.json(err.status, null));
                        }

                        var em = email[0];
                        ResetPassword.findOne({
                            user: userFounded.id
                        }).exec(function(err, resetFounded) {
                            if (err) {
                                return res.json(Response.json(err.status, null));
                            }
                            /*Si existe un registro para el usuario relacionado, 
                             *elimina el existente y crea uno nuevo
                             */
                            if (resetFounded != null) {
                                ResetPassword.destroy(resetFounded.id, function resetDestroyed(err, resetDestroy) {
                                    if (err) {
                                        return res.json(Response.json(err.status, null));
                                    }
                                    ResetPassword.create(reset, function resetPasswordCreated(err, resetPassword) {
                                        if (err) {
                                            return res.json(Response.json(err.status, null));
                                        }

                                        SendEmail.sendResetEmail(em, userFounded.email, userFounded.id, number, req);
                                        return res.json(Response.json('600', null));

                                    });

                                });
                            } else { //Si no existe un registro para el usuario relacionado
                                ResetPassword.create(reset, function resetPasswordCreated(err, resetPassword) {
                                    if (err) {
                                        return res.json(Response.json(err.status, null));
                                    }

                                    SendEmail.sendResetEmail(em, userFounded.email, userFounded.id, number, req);
                                    return res.json(Response.json('600', null));

                                });
                            }
                        });


                    });

                } else {
                    return res.json(Response.json('601',null));
                }
            });
        } else {
            return res.json(Response.json('606',null));
        }
    },
    /*Crea un registro con la información relacionada para restablecer 
     *la contraseña de un administrador
     */
    resetPassword: function(req, res) {

        Admin.findOne({
            email: req.param('email')
        }).exec(function(err, adminFounded) {
            if (err) {
                req.session.flash = {
                    err: sails.errorMessage(err)
                }
                return res.redirect('/session/forgetpassword/');
            }

            if (adminFounded != null) {
                var number = Random.digit();
                var reset = {
                    code: number,
                    user: adminFounded.id
                }
                Email.find(function emailFounded(err, email) {
                    if (err) {
                        req.session.flash = {
                            err: sails.errorMessage(err)
                        }
                        return res.redirect('/session/forgetpassword/');
                    }

                    var em = email[0];
                    ResetPassword.findOne({
                        user: adminFounded.id
                    }).exec(function(err, resetFounded) {
                        if (err) {
                            req.session.flash = {
                                err: sails.errorMessage(err)
                            }
                            return res.redirect('/session/forgetpassword/');
                        }
                        if (resetFounded != null) {
                            ResetPassword.destroy(resetFounded.id, function resetDestroyed(err, resetDestroy) {
                                if (err) {
                                    req.session.flash = {
                                        err: sails.errorMessage(err)
                                    }
                                    return res.redirect('/session/forgetpassword/');

                                }
                                ResetPassword.create(reset, function resetPasswordCreated(err, resetPassword) {
                                    if (err) {
                                        req.session.flash = {
                                            err: sails.errorMessage(err)
                                        }
                                        return res.redirect('/session/forgetpassword/');

                                    }

                                    SendEmail.sendResetEmailAdmin(em, adminFounded.email, adminFounded.id, number);
                                    return res.redirect('/session/login');

                                });

                            });
                        } else {
                            ResetPassword.create(reset, function resetPasswordCreated(err, resetPassword) {
                                if (err) {
                                    req.session.flash = {
                                        err: sails.errorMessage(err)
                                    }
                                    return res.redirect('/session/forgetpassword/');

                                }

                                SendEmail.sendResetEmailAdmin(em, adminFounded.email, adminFounded.id, number);
                                return res.redirect('/session/login');

                            });
                        }
                    });


                });

            } else {
                req.session.flash = {
                    err: 'El correo ingresado no existe, por favor verifique'
                }
                return res.redirect('/session/forgetpassword/');
            }
        });

    }


};