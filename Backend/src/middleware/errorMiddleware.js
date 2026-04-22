const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: Object.values(err.errors).map((e) => e.message),
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid resource identifier",
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Duplicate value detected",
            fields: err.keyValue,
        });
    }

    const message = err instanceof ApiError ? err.message : "Internal server error";

    return res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};

module.exports = errorHandler;
