import { Request, Response, NextFunction } from 'express';
import {
  BadRequestException,
  NotFoundException,
  InternalServerException,
  TooManyRequestsException,
  ValidationException
} from '../exceptions/exceptions';
import { ResponseHelper } from '../utils/genericResponse';

// Helper function to format errors
function formatErrors(errors: string[]): string[] {
  if (!errors || errors.length === 0) {
    return [];
  }
  return errors.map((error, index) => `${index + 1}. ${error}`);
}

export function customExceptionHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Log the error (you can use a logger library like winston or pino)
  console.error(
    `Error Message: ${err.message}, Time of occurrence: ${new Date().toISOString()}`
  );

  let message: string;
  let statusCode: number;
  let errors: string[];

  // Handle different exception types
  if (err instanceof InternalServerException) {
    message = err.message;
    statusCode = 500;
    errors = formatErrors(err.errors);
  } else if (err instanceof ValidationException) {
    message = err.message;
    statusCode = 400;
    errors = formatErrors([err.message]);
  } else if (err instanceof TooManyRequestsException) {
    message = err.message;
    statusCode = 429;
    errors = formatErrors(err.errors);
  } else if (err instanceof BadRequestException) {
    message = err.message;
    statusCode = 400;
    errors = formatErrors(err.errors);
  } else if (err instanceof NotFoundException) {
    message = err.message;
    statusCode = 404;
    errors = formatErrors(err.errors);
  } else if (err.name === 'PayloadTooLargeError') {
    message = 'Uploaded file is too large. Maximum allowed size is 5MB.';
    statusCode = 413;
    errors = formatErrors([err.message]);
  } else {
    // Default case for unexpected errors
    message = 'An unexpected error occurred.';
    statusCode = 500;
    errors = formatErrors([err.message]);
  }

  const response = ResponseHelper.error(message, statusCode, errors);

  res.status(statusCode).json(response);
}