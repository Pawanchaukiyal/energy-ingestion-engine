import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      return response.status(status).json({
        statusCode: status,
        path: request.url,
        message: exception.message,
        timestamp: new Date().toISOString(),
      });
    }

    console.error('UNEXPECTED ERROR:', exception);

    const internalError = new InternalServerErrorException(
      'Something went wrong. Please try again.',
    );

    return response.status(internalError.getStatus()).json({
      statusCode: internalError.getStatus(),
      path: request.url,
      message: internalError.message,
      timestamp: new Date().toISOString(),
    });
  }
}
