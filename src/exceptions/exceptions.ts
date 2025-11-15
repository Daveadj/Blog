export class BadRequestException extends Error {
  public errors: string[];
  public statusCode: number;

  constructor(message: string, errors?: string | string[]) {
    super(message);
    this.name = 'BadRequestException';
    this.statusCode = 400;
    
    if (typeof errors === 'string') {
      this.errors = [errors];
    } else if (Array.isArray(errors)) {
      this.errors = errors;
    } else {
      this.errors = [];
    }
  }
}

export class NotFoundException extends Error {
  public errors: string[];
  public statusCode: number;

  constructor(message: string, errors?: string | string[]) {
    super(message);
    this.name = 'NotFoundException';
    this.statusCode = 404;
    
    if (typeof errors === 'string') {
      this.errors = [errors];
    } else if (Array.isArray(errors)) {
      this.errors = errors;
    } else {
      this.errors = [];
    }
  }
}

export class InternalServerException extends Error {
  public errors: string[];
  public statusCode: number;

  constructor(message: string, errors?: string | string[]) {
    super(message);
    this.name = 'InternalServerException';
    this.statusCode = 500;
    
    if (typeof errors === 'string') {
      this.errors = [errors];
    } else if (Array.isArray(errors)) {
      this.errors = errors;
    } else {
      this.errors = [];
    }
  }
}

export class TooManyRequestsException extends Error {
  public errors: string[];
  public statusCode: number;

  constructor(message: string, errors?: string | string[]) {
    super(message);
    this.name = 'TooManyRequestsException';
    this.statusCode = 429;
    
    if (typeof errors === 'string') {
      this.errors = [errors];
    } else if (Array.isArray(errors)) {
      this.errors = errors;
    } else {
      this.errors = [];
    }
  }
}

export class ValidationException extends Error {
  public errors: string[];
  public statusCode: number;

  constructor(message: string, errors?: string | string[]) {
    super(message);
    this.name = 'ValidationException';
    this.statusCode = 400;
    
    if (typeof errors === 'string') {
      this.errors = [errors];
    } else if (Array.isArray(errors)) {
      this.errors = errors;
    } else {
      this.errors = [];
    }
  }
}