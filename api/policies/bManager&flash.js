module.exports = function(req, res, ok, next) {

    

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
    


};