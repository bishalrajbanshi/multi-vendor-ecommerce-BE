// src/filters/all-exceptions.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    // Re-throw BadRequestException and CascadeDeleteException to be handled separately
    if (exception instanceof BadRequestException) {
      throw exception;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // --- Logging ---
    this.logger.error('=== ERROR CAUGHT ===');
    this.logger.error(`Environment: ${process.env.NODE_ENV}`);
    this.logger.error(`Path: ${request.method} ${request.url}`);
    this.logger.error(`Status: ${status}`);
    this.logger.error(`Body: ${JSON.stringify(request.body)}`);
    this.logger.error(`Query: ${JSON.stringify(request.query)}`);
    this.logger.error(`Params: ${JSON.stringify(request.params)}`);
    this.logger.error(`Exception Type: ${exception?.constructor?.name}`);
    this.logger.error(`Exception:`, exception);
    if (exception instanceof Error) {
      this.logger.error(`Message: ${exception.message}`);
      this.logger.error(`Stack: ${exception.stack}`);
    }
    this.logger.error('===================');

    // --- Determine environment ---
    const isStaging = process.env.APP_ENV === 'staging';
    const isProduction = process.env.APP_ENV === 'production';
    const isDevelopment = !isProduction && !isStaging;

    const errorDetails = this.getErrorDetails(exception);

    // --- Build response ---
    let errorResponse: any;

    if (isProduction) {
      // Production: Generic message only
      errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...errorDetails,
      };
    } else if (isStaging) {
      // Staging: Detailed error without exposing stack trace too much
      errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...errorDetails,
        ...(exception instanceof Error && { stack: exception.stack }),
      };
    } else {
      // Development: Full error including stack
      errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...errorDetails,
        exception:
          exception instanceof Error ? exception.toString() : exception,
        ...(exception instanceof Error && { stack: exception.stack }),
      };
    }

    response.status(status).json(errorResponse);
  }

  // --- Extract detailed error info ---
  private getErrorDetails(exception: unknown): {
    message: string;
    error: string;
    errorType?: string;
    dbCode?: string;
    dbDetail?: string;
  } {
    // PostgreSQL / Drizzle errors
    if (exception && typeof exception === 'object' && 'code' in exception) {
      const code = (exception as any).code;
      const detail = (exception as any).detail;

      switch (code) {
        case '23505':
          return {
            message: 'Duplicate entry detected',
            error: 'Unique constraint violation',
            errorType: 'PostgreSQL Error',
            dbCode: code,
            dbDetail: detail,
          };
        case '23503':
          return {
            message: 'Related record does not exist (foreign key violation)',
            error: 'Foreign key violation',
            errorType: 'PostgreSQL Error',
            dbCode: code,
            dbDetail: detail,
          };
        case '23502':
          return {
            message: 'Missing required field',
            error: 'Not null violation',
            errorType: 'PostgreSQL Error',
            dbCode: code,
            dbDetail: detail,
          };
        case '42P01':
          return {
            message: 'Table not found',
            error: 'Table not found',
            errorType: 'PostgreSQL Error',
            dbCode: code,
            dbDetail: detail,
          };
        case '22P02':
          return {
            message: 'Invalid input syntax',
            error: 'Invalid type/value',
            errorType: 'PostgreSQL Error',
            dbCode: code,
            dbDetail: detail,
          };
        default:
          return {
            message: 'Database error',
            error: 'PostgreSQL Error',
            errorType: 'PostgreSQL Error',
            dbCode: code,
            dbDetail: detail,
          };
      }
    }

    // JavaScript Errors
    if (exception instanceof TypeError) {
      return {
        message: exception.message,
        error: 'Type Error',
        errorType: 'TypeError',
      };
    }
    if (exception instanceof ReferenceError) {
      return {
        message: exception.message,
        error: 'Reference Error',
        errorType: 'ReferenceError',
      };
    }
    if (exception instanceof RangeError) {
      return {
        message: exception.message,
        error: 'Range Error',
        errorType: 'RangeError',
      };
    }
    if (exception instanceof SyntaxError) {
      return {
        message: exception.message,
        error: 'Syntax Error',
        errorType: 'SyntaxError',
      };
    }

    // HTTP Exceptions
    if (exception instanceof HttpException) {
      const excResp = exception.getResponse();
      if (typeof excResp === 'object') {
        return {
          message: (excResp as any).message || 'An error occurred',
          error: (excResp as any).error || 'Http Exception',
          errorType: 'HttpException',
          ...(excResp as any),
        };
      }
      return {
        message: excResp,
        error: 'Http Exception',
        errorType: 'HttpException',
      };
    }

    // Generic Error
    if (exception instanceof Error) {
      return {
        message: exception.message,
        error: 'Internal Server Error',
        errorType: exception.constructor.name,
      };
    }

    // Unknown error
    return {
      message: 'Internal server error',
      error: 'Internal Server Error',
      errorType: 'Unknown',
    };
  }
}
