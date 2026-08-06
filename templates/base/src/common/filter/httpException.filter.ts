import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let body: Record<string, unknown>;
    if (typeof exceptionResponse === 'string') {
      body = {
        statusCode: status,
        message: exceptionResponse,
        error: exception.name.replace('Exception', ''),
      };
    } else if (exceptionResponse && typeof exceptionResponse === 'object') {
      body = { ...(exceptionResponse as Record<string, unknown>) };
      if (typeof body.statusCode !== 'number') {
        body.statusCode = status;
      }
    } else {
      body = { statusCode: status, message: exception.message };
    }

    this.logger.warn(
      `HTTP Exception: Status ${status} - Message: ${body.message}`,
    );
    response.status(status).json({
      ...body,
      success: false,
      timestamp: new Date().toISOString(),
    });
  }
}
