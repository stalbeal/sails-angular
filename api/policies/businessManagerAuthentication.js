module.exports = function(req, res, ok, next) {

    BuesinessManager.find(function businessManagerFounded (err, businessManager) {
    if(err){
        return next(err);
    }

    if(businessManager[0]==undefined){
        return ok();
    }else{

    if (req.session.authenticated  && req.session.businessManager ) {
        res.locals.flash = {};
        if (!req.session.flash) return ok();

        res.locals.flash = _.clone(req.session.flash);

        req.session.flash = {};
        return ok();
    }

    
	req.session.flash={
		err:'Debe iniciar sesión'
	}
	res.redirect('session/login');
	return;
    }


});
};