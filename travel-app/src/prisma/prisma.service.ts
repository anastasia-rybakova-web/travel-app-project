import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  constructor() {
    super({
      log: ['info', 'warn', 'error'],
    });
  }
  
  async onModuleInit() {
    await this.$connect();
    console.log('Подключение к базе данных установлено');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Подключение к базе данных закрыто');
  }
}