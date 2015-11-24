/**
 * EmailController
 *
 * @description :: Server-side logic for managing emails
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	new: function (req, res, next) {
		res.view();
			
	},
	/*Acualiza la información relacionada con la información de envio de correos
	 */
	update: function (req, res, next) {
		Email.find(function emailFounded (err, emails) {
			
			if(emails[0]!=null){
				//Modifica el registro en caso de que exista
				var emailExist=emails[0];
				var emailNew={
					emailFrom:req.param('emailFrom'),
					password:req.param('password'), 
					subject:req.param('subject'), 
					from:req.param('from'), 
					body:req.param('body')
				}
				Email.update(emailExist.id, emailNew, function emailUpdated (err, email) {
					if(err){
						req.session.flash = {
		                    err:  sails.errorMessage(err)
		                }
		                return res.redirect('/email/edit');
					}
					return res.redirect('/email/show/'+emailExist.id);

				});
			}else{
				//Crea un nuevo registro en caso de que no exista
				var emailNew={
					emailFrom:req.param('emailFrom'),
					password:req.param('password'), 
					subject:req.param('subject'), 
					from:req.param('from'), 
					body:req.param('body')
				}
				Email.create(emailNew, function emailCreated (err, email) {
					if(err){
						req.session.flash = {
		                    err:  sails.errorMessage(err)
		                }
		                return res.redirect('/email/new');
					}
					var result=email;
					return res.redirect('/email/show/'+result.id);

				});
			}
		});

	}, 
	/*Envia la información relacionada con la información de envio de correos
	 * a la vista edit
	 */
	edit:function  (req, res, next) {
		Email.find( function emailFounded (err, email) {
			if(err){return next(err);}
			if(email[0]!=null){
				var em=email[0];
			return res.view({
				email:em
			});
		}else{
			res.redirect('/email/new');
		}
		});
	
	}, 
	/*Envia la información relacionada con la información de envio de correos
	 * a la vista show
	 */
	 show:function  (req, res, next) {
		Email.find( function emailFounded (err, email) {
			if(err){return next(err);}
			if(email[0]!=null){
				var em=email[0];
			
			if(em!=undefined){
                 return res.view({
				email:em
			});
            }else{
                var err = new Error();
                  err.status = 404;
                  
                return next(err);
            }
		}else{
			res.redirect('/email/new');
		}
		});
	}
};

