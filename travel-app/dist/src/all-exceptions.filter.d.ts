import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { PrismaService } from './prisma/prisma.service';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private loggerService;
    private prisma;
    constructor(loggerService: LoggerService, prisma: PrismaService);
    catch(exception: unknown, host: ArgumentsHost): Promise<void>;
}
