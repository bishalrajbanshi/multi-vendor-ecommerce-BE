import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof BadRequestException) {
      throw exception;
    }
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof BadRequestException ? exception.getStatus() : 500;
    this.logger.error(
      `Status: ${status} | Method: ${request.method} | URL: ${request.url} | Message: ${exception.message}`,
    );
    let errResponse;
    const isStaging = process.env.APP_ENV === 'staging';
    const isProduction = process.env.APP_ENV === 'productionENV';
    if (isStaging) {
      errResponse = {
        statusCode: status,
        message: exception.message,
        error: exception.response.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      };
    } else if (isProduction) {
      errResponse = {
        statusCode: status,
        message: exception.message,
        error: exception.response.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      };
    } else {
      errResponse = {
        statusCode: status,
        message: exception.message,
        error: exception.response.message,
        timestamp: new Date().toISOString(),
        path: request.url,
        exception:
          exception instanceof Error ? exception.toString() : exception,
        stack:
          exception instanceof Error
            ? exception.stack
              ? exception.cause
              : undefined
            : undefined,
      };
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
