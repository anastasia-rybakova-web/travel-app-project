import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from './logger.service';
import { PrismaService } from './prisma/prisma.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private loggerService: LoggerService,
    private prisma: PrismaService,
  ) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Внутренняя ошибка сервера';
    
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (exception instanceof BadRequestException && typeof exceptionResponse === 'object') {
        const validationErrors = (exceptionResponse as any).message;
        message = Array.isArray(validationErrors) 
          ? validationErrors.join(', ') 
          : exception.message;
      } else {
        message = exception.message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }
    
    const user = (request as any).user;
    const userId = user?.userId;
    const userRole = user?.role;
    
    await this.loggerService.logError(
      exception instanceof Error ? exception : new Error(message),
      request,
      status,
      userId,
      userRole,
    );
    
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}