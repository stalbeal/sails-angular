module.exports = function(req, res, ok) {
    console.log(req.param('loggedUser'));
    UserLogin.findOne({
        user: req.param('loggedUser')
    }).exec(function(err, login) {

        if (err) {
            var response = {
                message: sails.errorMessage(err)
            }
            return res.json(response);
        }

        if (login != undefined) {
            console.log('entro');
            return ok();
        }
        var response = {
            message: 'Debe iniciar session'
        }
        res.json(response);
    });
}