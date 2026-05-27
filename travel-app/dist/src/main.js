"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const all_exceptions_filter_1 = require("./all-exceptions.filter");
const logger_service_1 = require("./logger.service");
const prisma_service_1 = require("./prisma/prisma.service");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: ['http://localhost:2000', 'http://localhost:3000', 'http://localhost:5173'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    const prismaService = app.get(prisma_service_1.PrismaService);
    const loggerService = new logger_service_1.LoggerService(prismaService);
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter(loggerService, prismaService));
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Сервер запущен на http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map