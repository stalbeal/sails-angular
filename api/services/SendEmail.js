/**
 *Optimizar
 */
 
/**
 *Servicio para el envio de email
 * @emailInfo objeto de tipo email
 * @destinyEmail destinatario al que se le enviara el email
 */
exports.sendEmail = function(emailInfo, destinyEmail) {

    var nodemailer = require("nodemailer");

    var smtpTransport = nodemailer.createTransport( {
        service: "Gmail",
        auth: {
            user: emailInfo.emailFrom,
            pass: emailInfo.password
        }
    });

    var mailOptions = {
        from: emailInfo.from +"<"+emailInfo.emailFrom+">", // sender address
        to: destinyEmail, // list of receivers
        subject: emailInfo.subject, // Subject line
        //text: emailInfo.body, // plaintext body
        html: emailInfo.body // html body
    };

    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
    });

};

exports.sendReportEmail = function(emailInfo, destinyEmail) {

    var nodemailer = require("nodemailer");

    var smtpTransport = nodemailer.createTransport( {
        service: "Gmail",
        auth: {
            user: emailInfo.emailFrom,
            pass: emailInfo.password
        }
    });

    var mailOptions = {
        from: emailInfo.from +"<"+emailInfo.emailFrom+">", // sender address
        to: destinyEmail, // list of receivers
        subject: emailInfo.subject, // Subject line
        //text: emailInfo.body, // plaintext body
        html: emailInfo.body // html body
    };

    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
    });

};



exports.sendResetEmail = function(emailInfo, destinyEmail, user, number) {

    var nodemailer = require("nodemailer");
  
    var smtpTransport = nodemailer.createTransport( {
        service: "Gmail",
        auth: {
            user: emailInfo.emailFrom,
            pass: emailInfo.password
        }
    });
    
        var link="<a href= \"http://www.helpet.com.co/user/resetpassword/"+user+"\" >";
        var link2="http://www.helpet.com.co/user/resetpassword/"+user;
        console.log(link);

    var mailOptions = {
        from: emailInfo.from +"<"+emailInfo.emailFrom+">", // sender address
        to: destinyEmail, // list of receivers
        subject: "Restablecer la contraseña de helPet", // Subject line
       // text: "Por favor siga el siguinte enlace"+link+" e ingrese el codigo: "+ number+"para cambiar su contraseña"
 // plaintext body
        html: '<p>Por favor siga el siguinte '+link+'enlace</a> e ingrese el código: <b>'+number+'</b> para cambiar su contraseña</p><p>En caso de que no funcione el enlce copielo y peguelo en su navegador: <b>'+link2+'</b></p>'  // html body
    };

    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
    });

};

exports.sendResetEmailAdmin = function(emailInfo, destinyEmail, admin, number) {

    var nodemailer = require("nodemailer");

    var smtpTransport = nodemailer.createTransport( {
        service: "Gmail",
        auth: {
            user: emailInfo.emailFrom,
            pass: emailInfo.password
        }
    });
    
        var link="<a href= \"http://www.helpet.com.co/admin/restorepassword/"+admin+"\" >";
        var link2="http://www.helpet.com.co/admin/restorepassword/"+admin;
        console.log(link);

    var mailOptions = {
        from: emailInfo.from +"<"+emailInfo.emailFrom+">", // sender address
        to: destinyEmail, // list of receivers
        subject: "Restablecer la contraseña de helPet", // Subject line
       // text: "Por favor siga el siguinte enlace"+link+" e ingrese el codigo: "+ number+"para cambiar su contraseña"
 // plaintext body
        html: '<p>Por favor siga el siguinte '+link+'enlace</a> e ingrese el código: <b>'+number+'</b> para cambiar su contraseña</p><p>En caso de que no funcione el enlce copielo y peguelo en su navegador: <b>'+link2+'</b></p>'  // html body
    };

    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
    });

};