import { Test, TestingModule } from '@nestjs/testing';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';

describe('RoutesController', () => {
  let controller: RoutesController;
  let routesService: RoutesService;

  const mockRoutesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    getPopularRoutes: jest.fn(),
    getRoutesByGuide: jest.fn(),
    searchRoutes: jest.fn(),
    getAllWithFilters: jest.fn(),
    getRouteWithAllData: jest.fn(),
    createRoute: jest.fn(),
    updateRoute: jest.fn(),
    deleteRoute: jest.fn(),
    getRouteReviews: jest.fn(),
    addRouteReview: jest.fn(),
    updateRouteReview: jest.fn(),
    deleteRouteReview: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutesController],
      providers: [
        {
          provide: RoutesService,
          useValue: mockRoutesService,
        },
      ],
    }).compile();

    controller = module.get<RoutesController>(RoutesController);
    routesService = module.get<RoutesService>(RoutesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all routes', async () => {
      const expectedRoutes = [
        { id: 1, title: 'Замки Беларуси', type: 'исторический' },
        { id: 2, title: 'Усадьбы родовых семей', type: 'исторический' },
      ];

      mockRoutesService.findAll.mockResolvedValue(expectedRoutes);

      const result = await controller.findAll();

      expect(result).toEqual(expectedRoutes);
      expect(routesService.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no routes', async () => {
      mockRoutesService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return route by id', async () => {
      const routeId = '1';
      const expectedRoute = {
        id: 1,
        title: 'Замки Беларуси',
        duration: '3 дня',
        price: '200',
        rating: 5,
      };

      mockRoutesService.findOne.mockResolvedValue(expectedRoute);

      const result = await controller.findOne(routeId);

      expect(result).toEqual(expectedRoute);
      expect(routesService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw error when route not found', async () => {
      const routeId = '999';

      mockRoutesService.findOne.mockRejectedValue(new Error('Маршрут не найден'));

      await expect(controller.findOne(routeId)).rejects.toThrow('Маршрут не найден');
    });
  });

  describe('getPopularRoutes', () => {
    it('should return popular routes with default limit', async () => {
      const expectedRoutes = [
        { id: 1, title: 'Замки Беларуси', rating: 5 },
        { id: 2, title: 'Усадьбы', rating: 4.5 },
      ];

      mockRoutesService.getPopularRoutes.mockResolvedValue(expectedRoutes);

      const result = await controller.getPopularRoutes();

      expect(result).toEqual(expectedRoutes);
      expect(routesService.getPopularRoutes).toHaveBeenCalledWith(6);
    });

    it('should return popular routes with custom limit', async () => {
      const limit = '3';

      mockRoutesService.getPopularRoutes.mockResolvedValue([]);

      await controller.getPopularRoutes(limit);

      expect(routesService.getPopularRoutes).toHaveBeenCalledWith(3);
    });

    it('should handle invalid limit parameter', async () => {
    const limit = 'invalid';

    mockRoutesService.getPopularRoutes.mockResolvedValue([]);

    await controller.getPopularRoutes(limit);

    expect(routesService.getPopularRoutes).toHaveBeenCalled();
  });
});

  describe('getRoutesByGuide', () => {
    it('should return routes by guide id', async () => {
      const guideUserId = '1';
      const expectedRoutes = [
        { id: 1, title: 'Замки Беларуси', guideUserId: 1 },
        { id: 2, title: 'Усадьбы', guideUserId: 1 },
      ];

      mockRoutesService.getRoutesByGuide.mockResolvedValue(expectedRoutes);

      const result = await controller.getRoutesByGuide(guideUserId);

      expect(result).toEqual(expectedRoutes);
      expect(routesService.getRoutesByGuide).toHaveBeenCalledWith(1);
    });

    it('should return empty array when guide has no routes', async () => {
      const guideUserId = '999';

      mockRoutesService.getRoutesByGuide.mockResolvedValue([]);

      const result = await controller.getRoutesByGuide(guideUserId);

      expect(result).toEqual([]);
    });
  });

  describe('searchRoutes', () => {
    it('should search routes with all parameters', async () => {
      const query = { keyword: 'замок', routeType: 'исторический', minPrice: '100' };
      const expectedRoutes = [{ id: 1, title: 'Замки Беларуси', price: '200' }];

      mockRoutesService.searchRoutes.mockResolvedValue(expectedRoutes);

      const result = await controller.searchRoutes(query.keyword, query.routeType, query.minPrice);

      expect(result).toEqual(expectedRoutes);
      expect(routesService.searchRoutes).toHaveBeenCalledWith('замок', 'исторический', 100);
    });

    it('should search routes without parameters', async () => {
      mockRoutesService.searchRoutes.mockResolvedValue([]);

      const result = await controller.searchRoutes();

      expect(result).toEqual([]);
      expect(routesService.searchRoutes).toHaveBeenCalledWith(undefined, undefined, undefined);
    });

    it('should search routes with only keyword', async () => {
      const keyword = 'замок';

      mockRoutesService.searchRoutes.mockResolvedValue([]);

      await controller.searchRoutes(keyword);

      expect(routesService.searchRoutes).toHaveBeenCalledWith('замок', undefined, undefined);
    });

    it('should handle invalid minPrice', async () => {
    const minPrice = 'invalid';

    mockRoutesService.searchRoutes.mockResolvedValue([]);

    await controller.searchRoutes(undefined, undefined, minPrice);

    expect(routesService.searchRoutes).toHaveBeenCalled();
  });
});

  describe('getWithFilters', () => {
    it('should filter routes with all criteria', async () => {
      const filters = {
        keyword: 'замок',
        type: 'исторический',
        price: '200',
        rating: '4',
        startDate: '2026-06-01',
        endDate: '2026-06-30',
      };
      const expectedRoutes = [{ id: 1, title: 'Замки Беларуси' }];

      mockRoutesService.getAllWithFilters.mockResolvedValue(expectedRoutes);

      const result = await controller.getWithFilters(
        filters.keyword,
        filters.type,
        filters.price,
        filters.rating,
        filters.startDate,
        filters.endDate,
      );

      expect(result).toEqual(expectedRoutes);
      expect(routesService.getAllWithFilters).toHaveBeenCalledWith({
        keyword: 'замок',
        type: 'исторический',
        price: 200,
        rating: 4,
        startDate: '2026-06-01',
        endDate: '2026-06-30',
      });
    });

    it('should filter routes without parameters', async () => {
      mockRoutesService.getAllWithFilters.mockResolvedValue([]);

      const result = await controller.getWithFilters();

      expect(result).toEqual([]);
      expect(routesService.getAllWithFilters).toHaveBeenCalledWith({
        keyword: undefined,
        type: undefined,
        price: undefined,
        rating: undefined,
        startDate: undefined,
        endDate: undefined,
      });
    });

    it('should filter routes with only keyword', async () => {
      const keyword = 'замок';

      mockRoutesService.getAllWithFilters.mockResolvedValue([]);

      await controller.getWithFilters(keyword);

      expect(routesService.getAllWithFilters).toHaveBeenCalledWith({
        keyword: 'замок',
        type: undefined,
        price: undefined,
        rating: undefined,
        startDate: undefined,
        endDate: undefined,
      });
    });

    it('should filter routes with only price', async () => {
      const price = '200';

      mockRoutesService.getAllWithFilters.mockResolvedValue([]);

      await controller.getWithFilters(undefined, undefined, price);

      expect(routesService.getAllWithFilters).toHaveBeenCalledWith({
        keyword: undefined,
        type: undefined,
        price: 200,
        rating: undefined,
        startDate: undefined,
        endDate: undefined,
      });
    });

    it('should filter routes with only rating', async () => {
      const rating = '4';

      mockRoutesService.getAllWithFilters.mockResolvedValue([]);

      await controller.getWithFilters(undefined, undefined, undefined, rating);

      expect(routesService.getAllWithFilters).toHaveBeenCalledWith({
        keyword: undefined,
        type: undefined,
        price: undefined,
        rating: 4,
        startDate: undefined,
        endDate: undefined,
      });
    });

    it('should filter routes with only date range', async () => {
      const startDate = '2026-06-01';
      const endDate = '2026-06-30';

      mockRoutesService.getAllWithFilters.mockResolvedValue([]);

      await controller.getWithFilters(undefined, undefined, undefined, undefined, startDate, endDate);

      expect(routesService.getAllWithFilters).toHaveBeenCalledWith({
        keyword: undefined,
        type: undefined,
        price: undefined,
        rating: undefined,
        startDate: '2026-06-01',
        endDate: '2026-06-30',
      });
    });

    it('should handle invalid price parameter', async () => {
    const price = 'invalid';

    mockRoutesService.getAllWithFilters.mockResolvedValue([]);

    await controller.getWithFilters(undefined, undefined, price);

    expect(routesService.getAllWithFilters).toHaveBeenCalled();
  });

  it('should handle invalid rating parameter', async () => {
    const rating = 'invalid';

    mockRoutesService.getAllWithFilters.mockResolvedValue([]);

    await controller.getWithFilters(undefined, undefined, undefined, rating);

    expect(routesService.getAllWithFilters).toHaveBeenCalled();
  });
});

  describe('getRouteWithAllData', () => {
    it('should return route with all related data', async () => {
      const routeId = '1';
      const expectedRoute = {
        id: 1,
        title: 'Замки Беларуси',
        places: [{ id: 1, title: 'Мирский замок' }],
        dates: ['2026-06-13', '2026-06-14'],
        reviews: [{ id: 1, rating: 5, text: 'Отлично!' }],
      };

      mockRoutesService.getRouteWithAllData.mockResolvedValue(expectedRoute);

      const result = await controller.getRouteWithAllData(routeId);

      expect(result).toEqual(expectedRoute);
      expect(routesService.getRouteWithAllData).toHaveBeenCalledWith(1);
    });
  });

  describe('createRoute', () => {
    it('should create a new route', async () => {
      const createDto = {
        title: 'Новый маршрут',
        shortDescription: 'Краткое описание',
        description: 'Полное описание',
        duration: '2 дня',
        people: '10',
        price: '150',
        type: 'культурный',
        photos: ['https://example.com/photo.jpg'],
        guideUserId: 1,
      };
      const expectedRoute = { id: 10, ...createDto };

      mockRoutesService.createRoute.mockResolvedValue(expectedRoute);

      const result = await controller.create(createDto);

      expect(result).toEqual(expectedRoute);
      expect(routesService.createRoute).toHaveBeenCalledWith(createDto);
    });
  });

  describe('updateRoute', () => {
    it('should update route', async () => {
      const routeId = '1';
      const updateData = { title: 'Обновленный маршрут', price: '250' };
      const expectedUpdated = { id: 1, ...updateData };

      mockRoutesService.updateRoute.mockResolvedValue(expectedUpdated);

      const result = await controller.update(routeId, updateData);

      expect(result).toEqual(expectedUpdated);
      expect(routesService.updateRoute).toHaveBeenCalledWith(1, updateData);
    });
  });

  describe('deleteRoute', () => {
    it('should delete route', async () => {
      const routeId = '1';

      mockRoutesService.deleteRoute.mockResolvedValue({ message: 'Маршрут удален' });

      await controller.delete(routeId);

      expect(routesService.deleteRoute).toHaveBeenCalledWith(1);
    });
  });

  describe('getRouteReviews', () => {
    it('should return reviews for a route', async () => {
      const routeId = '1';
      const expectedReviews = [
        { id: 1, userId: 1, username: 'user1', rating: 5, text: 'Отличный маршрут!' },
        { id: 2, userId: 2, username: 'user2', rating: 4, text: 'Хорошо' },
      ];

      mockRoutesService.getRouteReviews.mockResolvedValue(expectedReviews);

      const result = await controller.getRouteReviews(routeId);

      expect(result).toEqual(expectedReviews);
      expect(routesService.getRouteReviews).toHaveBeenCalledWith(1);
    });

    it('should return empty array when no reviews', async () => {
      const routeId = '1';

      mockRoutesService.getRouteReviews.mockResolvedValue([]);

      const result = await controller.getRouteReviews(routeId);

      expect(result).toEqual([]);
    });
  });

  describe('addRouteReview', () => {
    it('should add review for a route', async () => {
      const routeId = '1';
      const rating = 5;
      const text = 'Отличный маршрут!';
      const mockRequest = { user: { userId: 1 } };
      const expectedReview = { id: 10, routeId: 1, userId: 1, rating, text };

      mockRoutesService.addRouteReview.mockResolvedValue(expectedReview);

      const result = await controller.addRouteReview(routeId, mockRequest, rating, text);

      expect(result).toEqual(expectedReview);
      expect(routesService.addRouteReview).toHaveBeenCalledWith(1, 1, rating, text);
    });
  });

  describe('updateRouteReview', () => {
    it('should update a route review', async () => {
      const reviewId = '1';
      const rating = 4;
      const text = 'Обновленный отзыв';
      const mockRequest = { user: { userId: 1 } };
      const expectedReview = { id: 1, rating, text };

      mockRoutesService.updateRouteReview.mockResolvedValue(expectedReview);

      const result = await controller.updateRouteReview(reviewId, mockRequest, rating, text);

      expect(result).toEqual(expectedReview);
      expect(routesService.updateRouteReview).toHaveBeenCalledWith(1, 1, rating, text);
    });
  });

  describe('deleteRouteReview', () => {
    it('should delete a route review', async () => {
      const reviewId = '1';
      const mockRequest = { user: { userId: 1 } };

      mockRoutesService.deleteRouteReview.mockResolvedValue({ message: 'Отзыв удален' });

      const result = await controller.deleteRouteReview(reviewId, mockRequest);

      expect(result).toEqual({ message: 'Отзыв удален' });
      expect(routesService.deleteRouteReview).toHaveBeenCalledWith(1, 1);
    });
  });
});