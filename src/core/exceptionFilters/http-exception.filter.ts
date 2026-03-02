import {
  Catch,
  BadRequestException,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
interface StandardError {
  message: string;
  error: string;
  statusCode: number;
}
export function isStandardError(obj) {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.message === 'string' &&
    typeof obj.error === 'string' &&
    typeof obj.statusCode === 'number'
  );
}
@Catch(BadRequestException)
export class HTTPExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    res.status(400).json(exception.getResponse());
  }
}

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const exceptionResponse = exception.getResponse() as any;

    let validationErrors = [];
    if (
      Array.isArray(exceptionResponse.errors) &&
      !exceptionResponse.statusCode
    ) {
      validationErrors = exceptionResponse.errors.map((error) => {
        const property = error.field;
        const constraints = error.errors
          ? Object.values(error.errors)[0]
          : 'Invalid value';
        const value =
          error.source === 'body'
            ? request.body?.[property]
            : error.source === 'param'
              ? request.params?.[property]
              : error.source === 'query'
                ? request.query?.[property]
                : undefined;

        return {
          type: 'field',
          value: value,
          msg: `${property}: ${constraints}`,
          path: property,
          location: error.source,
        };
      });
    } else if (isStandardError(exceptionResponse)) {
      validationErrors = exceptionResponse.message;
    } else {
      const { errors } = exceptionResponse;
      validationErrors = errors;
    }

    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      message: 'The request failed due to a validation problem',
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      errors: validationErrors,
    });
  }
}
