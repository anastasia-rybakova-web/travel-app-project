import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class LoggerService extends ConsoleLogger {
  constructor(private prisma: PrismaService) {
    super();
  }

  async logError(
    error: Error,
    request: Request,
    statusCode: number,
    userId?: number,
    userRole?: string,
  ) {
    const logData = {
      method: request.method,
      url: request.url,
      statusCode,
      message: error.message,
      stack: error.stack,
      userId: userId,
      userRole: userRole,
      ip: request.ip || request.headers['x-forwarded-for'] as string,
      userAgent: request.headers['user-agent'],
      body: request.body ? JSON.parse(JSON.stringify(request.body)) : undefined,
      query: request.query ? JSON.parse(JSON.stringify(request.query)) : undefined,
      params: request.params ? JSON.parse(JSON.stringify(request.params)) : undefined,
    };

    try {
      await this.prisma.errorLog.create({
        data: logData,
      });
    } catch (logError) {
      console.error('Failed to save error log to database:', logError);
      console.error('Original error:', error);
    }
    this.error(`[${request.method}] ${request.url} - ${statusCode} - ${error.message}`);
  }
}