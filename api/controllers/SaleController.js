/**
 * SaleController
 *
 * @description :: Server-side logic for managing sales
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	new: function(req, res) {
		Category.find(function recordFound (err, categories) {
			return res.view({
				categories:categories
			});
		});
        
    },
    create: function(req, res, next) {
        var params = req.params.all();
        delete params.submit;
        delete params.id;

        Sale.create(params, function recordCreated(err, establishment) {
            if (err) {
                req.session.flash = {
                    err: sails.errorMessage(err)
                }
                return res.redirect('back');
            }

            req.session.flash = {
                err: 'Venta creada exitosamente'
            }
            return res.redirect('back');

        });
    }, 
    indexMobile: function(req, res) {
        Sale.find(function recordsFound(err, sales) {
            if (err) return res.json(Response.json(err.status, null));
            return res.json(Response.json('600', sales));
        });
    }
	
};

