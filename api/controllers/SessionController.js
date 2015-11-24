/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcrypt');
module.exports = {

    login: function(req, res, next) {
        return res.view({layout:'landing'});
    },
    /*Verifica el login y crea la sesión de los administradores
     */
    loginadmin: function(req, res, next) {
        var username = req.param('username');
        var password = req.param('password');
        if (!username || !password) {
            
            req.session.flash = {
                err: 'Error de validación'
            }
            return res.redirect('/session/login');
        }

        Admin.findOneByUsername(username, function adminFound(err, adminFounded) {
            if (err) {
                return next(err);
            }
            if (!adminFounded) {
                
                req.session.flash = {
                    err: 'El usuario no existe'
                }
                return res.redirect('/session/login');
            }


            bcrypt.compare(password,adminFounded.encryptedPassword, function passwordsMatch(err, valid) {
                if (err)
                    return next(err);
                if (!valid) {
                    
                    req.session.flash = {
                        err: 'La contraseña no coincide'
                    }
                    return res.redirect('/session/login');
                }
                if(req.session.businessManager!=null || req.session.businessManager!=undefined){
                    req.session.businessManager=null;
                }
                req.session.admin = adminFounded;
                req.session.authenticated= true;
                return res.redirect('/admin/show/'+adminFounded.id);


            });
        });
    },
    /*Verifica el login y crea la sesión de los businessManager
     */
    loginBusinessManager: function(req, res, next) {
        var username = req.param('username');
        var password = req.param('password');
        if (!username || !password) {
            
            req.session.flash = {
                err: 'Error de validación'
            }
            return res.redirect('/session/login');
        }

        BusinessManager.findOneByUsername(username, function businessManagerFound(err, businessManagerFounded) {
            if (err) {
                return next(err);
            }
            if (!businessManagerFounded) {
                
                req.session.flash = {
                    err: 'El usuario no existe'
                }
                return res.redirect('/session/login');
            }


            bcrypt.compare(password,businessManagerFounded.encryptedPassword, function passwordsMatch(err, valid) {
                if (err)
                    return next(err);
                if (!valid) {
                    
                    req.session.flash = {
                        err: 'La contraseña no coincide'
                    }
                    return res.redirect('/session/login');
                }

                if(req.session.admin!=null || req.session.admin!=undefined){
                    req.session.admin=null;
                }
                req.session.businessManager = businessManagerFounded;
                req.session.authenticated= true;
                return res.redirect('/businessManager/show/'+businessManagerFounded.id);


            });
        });
    },
    /*Elimina la sesión de los administradores
     */
    destroy: function (req, res, next) {
       req.session.destroy();
        res.redirect('session/login');

    },
    /*Retorna a la vista de restablecimiento de la contraseña 
     *para los administradores, en la cual ingresan el email
     */ 
    forgetpassword:function (req, res, next) {
        return res.view({});
    }

};

