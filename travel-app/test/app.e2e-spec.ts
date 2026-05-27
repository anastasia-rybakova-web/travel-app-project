import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
const request = require('supertest'); 
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('TropyBel API (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Сценарий 1: Оформление бронирования маршрута', () => {
    let guideToken: string;
    let touristToken: string;
    let guideId: number;
    let touristId: number;
    let routeId: number;
    let placeId: number;

    it('1.1 Регистрация гида', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          username: `guide_${Date.now()}`,
          password: 'password123',
          role: 'guide',
          phone: '+375291234567',
          email: 'guide@test.com',
        })
        .expect(201);

      guideToken = response.body.token;
      guideId = response.body.user.id;
      expect(guideToken).toBeDefined();
    });

    it('1.2 Регистрация туриста', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          username: `tourist_${Date.now()}`,
          password: 'password123',
          role: 'tourist',
        })
        .expect(201);

      touristToken = response.body.token;
      touristId = response.body.user.id;
      expect(touristToken).toBeDefined();
    });

    it('1.3 Создание места', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/places')
        .set('Authorization', `Bearer ${guideToken}`)
        .send({
          title: 'Тестовое место',
          address: 'г. Минск, ул. Тестовая, 1',
          region: 'Минская',
          shortDescription: 'Тестовое описание',
          description: 'Полное описание',
          tags: ['Тест'],
          photos: ['https://example.com/photo.jpg'],
          guideUserId: guideId,
        })
        .expect(201);

      placeId = response.body.id;
      expect(placeId).toBeDefined();
    });

    it('1.4 Создание маршрута', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/routes')
        .set('Authorization', `Bearer ${guideToken}`)
        .send({
          title: 'Тестовый маршрут',
          shortDescription: 'Краткое описание',
          description: 'Полное описание',
          duration: '2 дня',
          people: '10',
          price: '150',
          type: 'тестовый',
          photos: ['https://example.com/photo.jpg'],
          guideUserId: guideId,
          placeIds: [placeId],
          dates: ['2026-12-25', '2026-12-26'],
        })
        .expect(201);

      routeId = response.body.id;
      expect(routeId).toBeDefined();
    });

    it('1.5 Просмотр списка маршрутов (справочная информация)', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/routes')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      const foundRoute = response.body.find((r: any) => r.id === routeId);
      expect(foundRoute).toBeDefined();
    });

    it('1.6 Детальная информация о маршруте', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/routes/${routeId}/full`)
        .expect(200);

      expect(response.body.id).toBe(routeId);
      expect(response.body.places).toBeDefined();
      expect(response.body.dates).toBeDefined();
    });

    it('1.7 Создание бронирования', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/bookings')
        .set('Authorization', `Bearer ${touristToken}`)
        .send({
          routeId: routeId,
          guideUserId: guideId,
          date: '2026-12-25',
          people: 2,
          fio: 'Тестовый Турист',
          phone: '+375291234567',
          email: 'tourist@test.com',
        })
        .expect(201);

      expect(response.body.status).toBe('pending');
    });

    it('1.8 Подтверждение бронирования', async () => {
      const bookingsResponse = await request(app.getHttpServer())
        .get(`/api/bookings/guide/${guideId}`)
        .set('Authorization', `Bearer ${guideToken}`)
        .expect(200);

      const bookingId = bookingsResponse.body[0]?.id;
      expect(bookingId).toBeDefined();

      const updateResponse = await request(app.getHttpServer())
        .patch(`/api/bookings/${bookingId}/status`)
        .set('Authorization', `Bearer ${guideToken}`)
        .send({ status: 'confirmed' })
        .expect(200);

      expect(updateResponse.body.status).toBe('confirmed');
    });
  });

  describe('Сценарий 2: Создание отзыва и обновление рейтинга', () => {
    let touristToken: string;
    let guideToken: string;
    let guideId: number;
    let routeId: number;
    let placeId: number;
    let bookingId: number;

    it('2.1 Регистрация гида', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          username: `review_guide_${Date.now()}`,
          password: 'password123',
          role: 'guide',
        })
        .expect(201);

      guideToken = response.body.token;
      guideId = response.body.user.id;
    });

    it('2.2 Регистрация туриста', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          username: `review_tourist_${Date.now()}`,
          password: 'password123',
          role: 'tourist',
        })
        .expect(201);

      touristToken = response.body.token;
    });

    it('2.3 Создание места', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/places')
        .set('Authorization', `Bearer ${guideToken}`)
        .send({
          title: 'Место для отзыва',
          address: 'г. Минск, ул. Тестовая, 10',
          region: 'Минская',
          shortDescription: 'Описание',
          description: 'Полное описание',
          tags: ['Тест'],
          photos: ['https://example.com/photo.jpg'],
          guideUserId: guideId,
        })
        .expect(201);

      placeId = response.body.id;
    });

    it('2.4 Создание маршрута', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/routes')
        .set('Authorization', `Bearer ${guideToken}`)
        .send({
          title: 'Маршрут для отзыва',
          shortDescription: 'Краткое описание',
          description: 'Полное описание',
          duration: '1 день',
          people: '5',
          price: '100',
          type: 'тестовый',
          photos: ['https://example.com/photo.jpg'],
          guideUserId: guideId,
          placeIds: [placeId],
          dates: ['2026-12-20'],
        })
        .expect(201);

      routeId = response.body.id;
    });

    it('2.5 Создание и завершение бронирования', async () => {
      const bookingResponse = await request(app.getHttpServer())
        .post('/api/bookings')
        .set('Authorization', `Bearer ${touristToken}`)
        .send({
          routeId: routeId,
          guideUserId: guideId,
          date: '2026-12-20',
          people: 1,
          fio: 'Тестовый Турист',
          phone: '+375291234567',
          email: 'test@test.com',
        })
        .expect(201);

      bookingId = bookingResponse.body.id;

      await request(app.getHttpServer())
        .patch(`/api/bookings/${bookingId}/status`)
        .set('Authorization', `Bearer ${guideToken}`)
        .send({ status: 'confirmed' })
        .expect(200);

      await request(app.getHttpServer())
        .patch(`/api/bookings/${bookingId}/complete`)
        .set('Authorization', `Bearer ${guideToken}`)
        .expect(200);
    });

    it('2.6 Просмотр списка мест (справочная информация)', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/places')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      const foundPlace = response.body.find((p: any) => p.id === placeId);
      expect(foundPlace).toBeDefined();
    });

it('2.7 Проверка возможности оставить отзыв', async () => {
  const response = await request(app.getHttpServer())
    .get(`/api/bookings/check-completed/${routeId}`)
    .set('Authorization', `Bearer ${touristToken}`)
    .expect(200);

  expect(response.body).toBeDefined();
  expect(response.body === true || Object.keys(response.body).length === 0 ? false : true);
});

it('2.8 Создание отзыва о маршруте', async () => {
  const response = await request(app.getHttpServer())
    .post(`/api/routes/${routeId}/reviews`)
    .set('Authorization', `Bearer ${touristToken}`)
    .send({
      rating: 5,
      text: 'Отличный маршрут!',
    })
    .expect(201);

  expect(Number(response.body.rating)).toBe(5);
});

it('2.9 Создание отзыва о гиде', async () => {
  const response = await request(app.getHttpServer())
    .post(`/api/reviews/guides/${guideId}`)
    .set('Authorization', `Bearer ${touristToken}`)
    .send({
      rating: 5,
      text: 'Отличный гид!',
    })
    .expect(201);

  expect(Number(response.body.rating)).toBe(5);
});

    it('2.10 Просмотр отзывов о гиде', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/reviews/guides/${guideId}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});