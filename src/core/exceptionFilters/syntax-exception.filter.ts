import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(SyntaxError)
export class JsonSyntaxExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(JsonSyntaxExceptionFilter.name);

  catch(exception: SyntaxError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.logger.error(`Invalid JSON: ${exception.message}`);

    response.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      statusCode: HttpStatus.BAD_REQUEST,
      message: ['Invalid JSON payload'],
      error: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
