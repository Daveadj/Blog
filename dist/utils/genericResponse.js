"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
class ResponseHelper {
    // Success with data
    static success(data, message = 'Operation completed successfully', statusCode = 200) {
        return {
            isSuccess: true,
            message,
            data,
            errors: [],
            statusCode,
            timestamp: new Date()
        };
    }
    // Success without data
    static successNoData(message = 'Operation completed successfully', statusCode = 200) {
        return {
            isSuccess: true,
            message,
            errors: [],
            statusCode,
            timestamp: new Date()
        };
    }
    // Error without data
    static error(message, statusCode = 400, errors) {
        const errorList = errors
            ? Array.isArray(errors)
                ? errors
                : [errors]
            : [];
        return {
            isSuccess: false,
            message,
            errors: errorList,
            statusCode,
            timestamp: new Date()
        };
    }
    // Error with data
    static errorWithData(data, message, statusCode = 400, errors) {
        return {
            isSuccess: false,
            message,
            data,
            errors: errors || [],
            statusCode,
            timestamp: new Date()
        };
    }
}
exports.ResponseHelper = ResponseHelper;
