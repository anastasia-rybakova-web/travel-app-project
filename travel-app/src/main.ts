import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { LoggerService } from './logger.service';
import { PrismaService } from './prisma/prisma.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');
  
  app.enableCors({
    origin: ['http://localhost:2000', 'http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  
  const prismaService = app.get(PrismaService);
  const loggerService = new LoggerService(prismaService);
  app.useGlobalFilters(new AllExceptionsFilter(loggerService, prismaService));
  
  const config = new DocumentBuilder()
    .setTitle('TropyBel API Documentation')
    .setDescription(`
      Документация API для туристического сервиса TropyBel.
      Получить токен можно через POST /api/auth/login.
    `)
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Введите JWT токен, полученный при авторизации',
    })
    .addTag('auth', 'Авторизация и регистрация')
    .addTag('guides', 'Управление гидами')
    .addTag('tourists', 'Управление туристами')
    .addTag('places', 'Управление местами')
    .addTag('routes', 'Управление маршрутами')
    .addTag('bookings', 'Управление бронированиями')
    .addTag('reviews', 'Управление отзывами')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); 

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Сервер запущен на http://localhost:${port}`);
}
bootstrap();