// errorHandler.js

const errorHandler = (err, req, res, next) => {
    // Handle validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: err.message
        });
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token'
        });
    }

    // Handle MongoDB errors
    if (err.name === 'MongoError') {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'error',
                message: 'Duplicate key error'
            });
        }
    }

    // Handle all other errors
    return res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
    });
};

module.exports = errorHandler;
