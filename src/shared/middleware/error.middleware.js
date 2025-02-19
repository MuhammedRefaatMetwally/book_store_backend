const ResourceNotFoundError = require("../error/resource_not_found_error");
const RuntimeError = require("../error/runtime_error");

const errorMiddleware = (err, req, res, next) => { 
    try {
        let error = err instanceof RuntimeError ? err : new RuntimeError(err.message, err.statusCode || 500);

        console.error(err); 

        if (err.name === 'CastError') {
            error = new ResourceNotFoundError("Resource", "id", err.value);
        }

        if (err.code === 11000) {
            error = new RuntimeError("Duplicate field value entered", 400);
        }

        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message).join(", ");
            error = new RuntimeError(message, 400);
        }

        res.status(error.statusCode).json({ 
            success: false, 
            error: error.message, 
            details: error.details || null 
        });
    } catch (error) {
        next(error);
    }
};

module.exports = errorMiddleware;
