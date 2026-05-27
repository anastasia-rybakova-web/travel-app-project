import { ConsoleLogger } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Request } from 'express';
export declare class LoggerService extends ConsoleLogger {
    private prisma;
    constructor(prisma: PrismaService);
    logError(error: Error, request: Request, statusCode: number, userId?: number, userRole?: string): Promise<void>;
}
