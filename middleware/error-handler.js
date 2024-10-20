"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const http_status_codes_1 = require("http-status-codes");
// Error handler middleware
const errorHandler = (err, req, res, next) => {
    // Handle BadRequestError (or any other specific custom errors)
    if (err instanceof bad_request_1.default) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: err.message });
        return;
    }
    // Generic server error for other types of errors
    const statusCode = err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Something went wrong. Please try again later.';
    res.status(statusCode).json({ message });
};
exports.default = errorHandler;
