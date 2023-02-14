const {constants} = require('./constant')
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode || 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({message: err.message, stackTrace: err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({message: err.message, stackTrace: err.stack});
        case constants.FORBIDDEN:
            res.json({message: err.message, stackTrace: err.stack});
        default:
            break;
    }
};

module.exports = errorHandler;