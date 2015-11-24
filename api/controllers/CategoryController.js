/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs');
module.exports = {
    /*
     * Retorna a la vista new
     */
    new: function(req, res, next) {
        res.view();
    },
    /*
     * Crea un objeto
     */
    create: function(req, res, next) {
        var params = req.params.all();
        var categoryObj = {
            name: params.name,
            description: params.description,
            image: params.image
        }
        Category.create(categoryObj, function recordCreated(err, category) {
            if (err) {
                req.session.flash = {
                    err: sails.errorMessage(err)
                }
                return res.redirect('/category/new');
            }
            return res.redirect('/category/show/' + category.id);
        });
    },
    /*
     * Actualiza un objeto
     */
    update: function(req, res, next) {
        var params = req.params.all();
        var categoryObj = {
            name: params.name,
            description: params.description
        }
        Category.update(params.id, categoryObj, function recordUpdated(err, category) {
            if (err) {
                req.session.flash = {
                    err: sails.errorMessage(err)
                }
                return res.redirect('/category/edit/' + params.id);
            }
            return res.redirect('/category/show/' + params.id);
        });
    },
    /*
     * Retorna a la vista edit
     */
    edit: function(req, res, next) {
        Category.findOne({
            id: req.param('id')
        }).exec(function(err, category) {
            if (err) {
                return next(err);
            }
            if (Response.view(category, next)) {
                return res.view({
                    category: category
                });
            }
        });
    },
    /*
     * Retorna a la vista show
     */
    show: function(req, res, next) {
        Category.findOne({
            id: req.param('id')
        }).exec(function(err, category) {
            if (err) {
                return next(err);
            }
            if (Response.view(category, next)) {
                return res.view({
                    category: category
                });
            }
        });
    },
    /*
     * Retorna a la vista index
     */
    index: function(req, res, next) {
        Category.find().sort('name').exec(function recordsFound(err, categories) {
            if (err) {
                return next(err);
            }
            return res.view({
                categories: categories
            });
        });
    },
    /*
     * Retorna un json
     */
    indexMobile: function(req, res, next) {
        Country.find().sort('name').exec(function countriesFound(err, countries) {
            State.find().sort('name').exec(function stateFound(err, states) {
                City.find().sort('name').exec(function cityFound(err, cities) {
                    Category.find().sort('name').exec(function recordsFound(err, categories) {
                        if (err) {
                            return res.json(Response.json(err.status, null));
                        }
                        return res.json(Response.json('600', {
                            categories: categories,
                            countries: countries,
                            states: states,
                            cities: cities
                        }));
                    });
                });
            });
        });
    },
    /*
     * Sube la imagen al servidor
     */
    upload: function(req, res, next) {
        var fileName = req.param('id') + '.png';
        var image = req.file('image');
        var path = 'category';
        var params = req.params.all();
        Category.findOne({
            id: params.id
        }).exec(function(err, category) {
            if (req.file('image')._files.length > 0) {
                uploadPath = Image.uploadImg(fileName, image, path, params.id, res);
                //return res.redirect('/category/changeImage?uploadPath=' + uploadPath + '&categoryId=' + params.id);
            } else {
                req.session.flash = {
                    err: 'No seleccionó ninguna imagen'
                }
                return res.redirect('/category/show/' + params.id);
            }
        });

    },
    /*
     * Retorna un json
     */
    changeImage: function(req, res, next) {
        var params = req.params.all();
        var base64_data = new Buffer(fs.readFileSync(params.uploadPath)).toString('base64');
        fs.unlink(params.uploadPath, function(err) {
            if (err) {
                console.log(err);
                return next(err);
            }
            Category.update(params.categoryId, {
                    image: base64_data
                },
                function recordUpdated(err, categoryUpdated) {
                    return res.redirect('/category/show/' + req.param('categoryId'));
                });
        });
    }
};