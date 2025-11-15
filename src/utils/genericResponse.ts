export interface GenericResponse<T> {
  isSuccess: boolean;
  message: string;
  data?: T;
  errors: string[];
  statusCode: number;
  timestamp: Date;
}

export class ResponseHelper {
  // Success with data
  static success<T>(
    data: T,
    message: string = 'Operation completed successfully',
    statusCode: number = 200
  ): GenericResponse<T> {
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
  static successNoData(
    message: string = 'Operation completed successfully',
    statusCode: number = 200
  ): GenericResponse<null> {
    return {
      isSuccess: true,
      message,
      errors: [],
      statusCode,
      timestamp: new Date()
    };
  }

  // Error without data
  static error(
    message: string,
    statusCode: number = 400,
    errors?: string[] | string
  ): GenericResponse<null> {
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
  static errorWithData<T>(
    data: T,
    message: string,
    statusCode: number = 400,
    errors?: string[]
  ): GenericResponse<T> {
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