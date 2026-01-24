"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customExceptionHandler = customExceptionHandler;
const exceptions_1 = require("../exceptions/exceptions");
const genericResponse_1 = require("../utils/genericResponse");
// Helper function to format errors
function formatErrors(errors) {
    if (!errors || errors.length === 0) {
        return [];
    }
    return errors.map((error, index) => `${index + 1}. ${error}`);
}
function customExceptionHandler(err, req, res, next) {
    // Log the error (you can use a logger library like winston or pino)
    console.error(`Error Message: ${err.message}, Time of occurrence: ${new Date().toISOString()}`);
    let message;
    let statusCode;
    let errors;
    // Handle different exception types
    if (err instanceof exceptions_1.InternalServerException) {
        message = err.message;
        statusCode = 500;
        errors = formatErrors(err.errors);
    }
    else if (err instanceof exceptions_1.ValidationException) {
        message = err.message;
        statusCode = 400;
        errors = formatErrors([err.message]);
    }
    else if (err instanceof exceptions_1.TooManyRequestsException) {
        message = err.message;
        statusCode = 429;
        errors = formatErrors(err.errors);
    }
    else if (err instanceof exceptions_1.BadRequestException) {
        message = err.message;
        statusCode = 400;
        errors = formatErrors(err.errors);
    }
    else if (err instanceof exceptions_1.NotFoundException) {
        message = err.message;
        statusCode = 404;
        errors = formatErrors(err.errors);
    }
    else if (err.name === 'PayloadTooLargeError') {
        message = 'Uploaded file is too large. Maximum allowed size is 5MB.';
        statusCode = 413;
        errors = formatErrors([err.message]);
    }
    else {
        // Default case for unexpected errors
        message = 'An unexpected error occurred.';
        statusCode = 500;
        errors = formatErrors([err.message]);
    }
    const response = genericResponse_1.ResponseHelper.error(message, statusCode, errors);
    res.status(statusCode).json(response);
}
