"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = exports.TooManyRequestsException = exports.InternalServerException = exports.NotFoundException = exports.BadRequestException = void 0;
class BadRequestException extends Error {
    constructor(message, errors) {
        super(message);
        this.name = 'BadRequestException';
        this.statusCode = 400;
        if (typeof errors === 'string') {
            this.errors = [errors];
        }
        else if (Array.isArray(errors)) {
            this.errors = errors;
        }
        else {
            this.errors = [];
        }
    }
}
exports.BadRequestException = BadRequestException;
class NotFoundException extends Error {
    constructor(message, errors) {
        super(message);
        this.name = 'NotFoundException';
        this.statusCode = 404;
        if (typeof errors === 'string') {
            this.errors = [errors];
        }
        else if (Array.isArray(errors)) {
            this.errors = errors;
        }
        else {
            this.errors = [];
        }
    }
}
exports.NotFoundException = NotFoundException;
class InternalServerException extends Error {
    constructor(message, errors) {
        super(message);
        this.name = 'InternalServerException';
        this.statusCode = 500;
        if (typeof errors === 'string') {
            this.errors = [errors];
        }
        else if (Array.isArray(errors)) {
            this.errors = errors;
        }
        else {
            this.errors = [];
        }
    }
}
exports.InternalServerException = InternalServerException;
class TooManyRequestsException extends Error {
    constructor(message, errors) {
        super(message);
        this.name = 'TooManyRequestsException';
        this.statusCode = 429;
        if (typeof errors === 'string') {
            this.errors = [errors];
        }
        else if (Array.isArray(errors)) {
            this.errors = errors;
        }
        else {
            this.errors = [];
        }
    }
}
exports.TooManyRequestsException = TooManyRequestsException;
class ValidationException extends Error {
    constructor(message, errors) {
        super(message);
        this.name = 'ValidationException';
        this.statusCode = 400;
        if (typeof errors === 'string') {
            this.errors = [errors];
        }
        else if (Array.isArray(errors)) {
            this.errors = errors;
        }
        else {
            this.errors = [];
        }
    }
}
exports.ValidationException = ValidationException;
