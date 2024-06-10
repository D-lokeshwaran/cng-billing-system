const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}\t${err.message}`, 'errorLog.txt');
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        error: {
            success: false,
            code: errStatus,
            message: errMsg,
            stack: process.env.NODE_ENV === 'development' ? err.stack : {}
        }
    })
}

module.exports = errorHandler