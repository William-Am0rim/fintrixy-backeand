"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.globalErrorHandler = exports.AppError = void 0;
const client_1 = require("@prisma/client");
const config_1 = require("../config");
class AppError extends Error {
    statusCode;
    status;
    isOperational;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
    }
}
exports.AppError = AppError;
const globalErrorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    if (config_1.config.nodeEnv === "development") {
        console.error("ERROR 💥:", err);
    }
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            error = new AppError("Duplicate field value entered", 400);
        }
        if (err.code === "P2025") {
            error = new AppError("Record not found", 404);
        }
    }
    const statusCode = error.statusCode || 500;
    const message = error.message || "Server Error";
    res.status(statusCode).json({
        success: false,
        message,
        ...(config_1.config.nodeEnv === "development" && { stack: err.stack }),
    });
};
exports.globalErrorHandler = globalErrorHandler;
const notFound = (req, res) => {
    const error = new AppError(`Not Found - ${req.originalUrl}`, 404);
    res.status(404);
    res.json({
        success: false,
        message: error.message,
    });
};
exports.notFound = notFound;
//# sourceMappingURL=error.middleware.js.map