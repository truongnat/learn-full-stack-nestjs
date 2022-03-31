import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const message = exception.getMessage();

    response.status(status).json({
      message,
      statusCode: status,
      time: new Date().toISOString(),
    });
  }
}
