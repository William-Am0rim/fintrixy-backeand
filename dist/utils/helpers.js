"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = exports.catchAsync = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    status;
    isOperational;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
exports.catchAsync = catchAsync;
exports.response = {
    success: (res, data, message = "Success", statusCode = 200) => {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    },
    created: (res, data, message = "Created successfully") => {
        return res.status(201).json({
            success: true,
            message,
            data,
        });
    },
    error: (res, message = "Error", statusCode = 500, errors = null) => {
        return res.status(statusCode).json({
            success: false,
            message,
            errors,
        });
    },
    paginated: (res, data, pagination) => {
        return res.status(200).json({
            success: true,
            data,
            pagination,
        });
    },
};
//# sourceMappingURL=helpers.js.map