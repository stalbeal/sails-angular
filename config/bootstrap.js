/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
  
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();

  sails.ip='192.168.1.13:1337';
  /*Import del modulo error_handler_sails-js para el manejo de los errores*/
  sails.errorMessage = require('error_handler_sails-js');

  /*Import del modulo bcrypt para encriptar contraseñas*/
  sails.bcrypt = require('bcrypt');

  /*Import del fs para el manejo de archivos*/
  sails.fs = require('fs');

  /********************************************************
  Import para notificaciones en android
  sails.gcm = require('node-gcm');
  sails.sender = new sails.gcm.Sender('AIzaSyAcl7eymXCNX9WgXT_1-6iHRp5-RgsRLcg');
  *****************************************************/
};
