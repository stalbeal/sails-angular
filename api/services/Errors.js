exports.view = function(attribute, next) {

    if (attribute == undefined || attribute == null || attribute == "") {
        console.log('error');
        var err = new Error();
        err.status = 404;

        return next(err);
    } else {
        return true;
    }
};

exports.response = function(err, attribute) {

    if (attribute == undefined || attribute == null || attribute == "") {
        var response = {
            message: '606',
            result: null
        }
        return response;
    } else {
        var response = {
        message: err,
        result:attribute
    }
    return response;
    }
};