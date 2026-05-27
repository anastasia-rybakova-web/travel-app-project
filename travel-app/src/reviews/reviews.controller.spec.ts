import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

describe('ReviewsController', () => {
  let controller: ReviewsController;
  let reviewsService: ReviewsService;

  const mockReviewsService = {
    getPlaceReviews: jest.fn(),
    addPlaceReview: jest.fn(),
    updatePlaceReview: jest.fn(),
    deletePlaceReview: jest.fn(),
    getRouteReviews: jest.fn(),
    addRouteReview: jest.fn(),
    updateRouteReview: jest.fn(),
    deleteRouteReview: jest.fn(),
    getGuideReviews: jest.fn(),
    addGuideReview: jest.fn(),
    updateGuideReview: jest.fn(),
    deleteGuideReview: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        {
          provide: ReviewsService,
          useValue: mockReviewsService,
        },
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
    reviewsService = module.get<ReviewsService>(ReviewsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPlaceReviews', () => {
    it('should return reviews for a place', async () => {
      const placeId = '1';
      const expectedReviews = [
        { id: 1, userId: 1, username: 'user1', rating: 5, text: 'Отлично!' },
      ];

      mockReviewsService.getPlaceReviews.mockResolvedValue(expectedReviews);

      const result = await controller.getPlaceReviews(placeId);

      expect(result).toEqual(expectedReviews);
      expect(reviewsService.getPlaceReviews).toHaveBeenCalledWith(1);
    });

    it('should return empty array when no reviews', async () => {
      const placeId = '1';

      mockReviewsService.getPlaceReviews.mockResolvedValue([]);

      const result = await controller.getPlaceReviews(placeId);

      expect(result).toEqual([]);
    });
  });

  describe('addPlaceReview', () => {
    it('should add a place review', async () => {
      const placeId = '1';
      const body = { rating: 5, text: 'Отличное место!', photo: 'https://example.com/photo.jpg' };
      const mockRequest = { user: { userId: 3 } };
      const expectedReview = { id: 10, placeId: 1, userId: 3, ...body };

      mockReviewsService.addPlaceReview.mockResolvedValue(expectedReview);

      const result = await controller.addPlaceReview(placeId, mockRequest, body);

      expect(result).toEqual(expectedReview);
      expect(reviewsService.addPlaceReview).toHaveBeenCalledWith(1, 3, 5, 'Отличное место!', 'https://example.com/photo.jpg');
    });

    it('should add a place review without photo', async () => {
      const placeId = '1';
      const body = { rating: 5, text: 'Отличное место!' };
      const mockRequest = { user: { userId: 3 } };
      const expectedReview = { id: 10, placeId: 1, userId: 3, ...body };

      mockReviewsService.addPlaceReview.mockResolvedValue(expectedReview);

      const result = await controller.addPlaceReview(placeId, mockRequest, body);

      expect(result).toEqual(expectedReview);
      expect(reviewsService.addPlaceReview).toHaveBeenCalledWith(1, 3, 5, 'Отличное место!', undefined);
    });
  });

  describe('updatePlaceReview', () => {
    it('should update a place review', async () => {
      const reviewId = '1';
      const body = { rating: 4, text: 'Обновленный отзыв' };
      const mockRequest = { user: { userId: 3 } };
      const expectedReview = { id: 1, ...body };

      mockReviewsService.updatePlaceReview.mockResolvedValue(expectedReview);

      const result = await controller.updatePlaceReview(reviewId, mockRequest, body);

      expect(result).toEqual(expectedReview);
      expect(reviewsService.updatePlaceReview).toHaveBeenCalledWith(1, 3, 4, 'Обновленный отзыв');
    });
  });

  describe('deletePlaceReview', () => {
    it('should delete a place review', async () => {
      const reviewId = '1';
      const mockRequest = { user: { userId: 3 } };

      mockReviewsService.deletePlaceReview.mockResolvedValue({ message: 'Отзыв удален' });

      const result = await controller.deletePlaceReview(reviewId, mockRequest);

      expect(result).toEqual({ message: 'Отзыв удален' });
      expect(reviewsService.deletePlaceReview).toHaveBeenCalledWith(1, 3);
    });
  });

  describe('getRouteReviews', () => {
    it('should return reviews for a route', async () => {
      const routeId = '1';
      const expectedReviews = [
        { id: 1, userId: 1, username: 'user1', rating: 5, text: 'Отличный маршрут!' },
      ];

      mockReviewsService.getRouteReviews.mockResolvedValue(expectedReviews);

      const result = await controller.getRouteReviews(routeId);

      expect(result).toEqual(expectedReviews);
      expect(reviewsService.getRouteReviews).toHaveBeenCalledWith(1);
    });

    it('should return empty array when no reviews', async () => {
      const routeId = '1';

      mockReviewsService.getRouteReviews.mockResolvedValue([]);

      const result = await controller.getRouteReviews(routeId);

      expect(result).toEqual([]);
    });
  });

  describe('addRouteReview', () => {
    it('should add a route review', async () => {
      const routeId = '1';
      const body = { rating: 5, text: 'Отличный маршрут!', photo: 'https://example.com/photo.jpg' };
      const mockRequest = { user: { userId: 3 } };
      const expectedReview = { id: 10, routeId: 1, userId: 3, ...body };

      mockReviewsService.addRouteReview.mockResolvedValue(expectedReview);

      const result = await controller.addRouteReview(routeId, mockRequest, body);

      expect(result).toEqual(expectedReview);
      expect(reviewsService.addRouteReview).toHaveBeenCalledWith(1, 3, 5, 'Отличный маршрут!', 'https://example.com/photo.jpg');
    });

    it('should add a route review without photo', async () => {
      const routeId = '1';
      const body = { rating: 5, text: 'Отличный маршрут!' };
      const mockRequest = { user: { userId: 3 } };
      const expectedReview = { id: 10, routeId: 1, userId: 3, ...body };

      mockReviewsService.addRouteReview.mockResolvedValue(expectedReview);

      const result = await controller.addRouteReview(routeId, mockRequest, body);

      expect(result).toEqual(expectedReview);
      expect(reviewsService.addRouteReview).toHaveBeenCalledWith(1, 3, 5, 'Отличный маршрут!', undefined);
    });
  });

  describe('updateRouteReview', () => {
    it('should update a route review', async () => {
      const reviewId = '1';
      const body = { rating: 4, text: 'Обновленный отзыв' };
      const mockRequest = { user: { userId: 3 } };
      const expectedReview = { id: 1, ...body };

      mockReviewsService.updateRouteReview.mockResolvedValue(expectedReview);

      const result = await controller.updateRouteReview(reviewId, mockRequest, body);

      expect(result).toEqual(expectedReview);
      expect(reviewsService.updateRouteReview).toHaveBeenCalledWith(1, 3, 4, 'Обновленный отзыв');
    });
  });

  describe('deleteRouteReview', () => {
    it('should delete a route review', async () => {
      const reviewId = '1';
      const mockRequest = { user: { userId: 3 } };

      mockReviewsService.deleteRouteReview.mockResolvedValue({ message: 'Отзыв удален' });

      const result = await controller.deleteRouteReview(reviewId, mockRequest);

      expect(result).toEqual({ message: 'Отзыв удален' });
      expect(reviewsService.deleteRouteReview).toHaveBeenCalledWith(1, 3);
    });
  });

  describe('getGuideReviews', () => {
    it('should return reviews for a guide', async () => {
      const guideUserId = '1';
      const expectedReviews = [
        { id: 1, userId: 3, username: 'user3', rating: 5, text: 'Отличный гид!' },
      ];

      mockReviewsService.getGuideReviews.mockResolvedValue(expectedReviews);

      const result = await controller.getGuideReviews(guideUserId);

      expect(result).toEqual(expectedReviews);
      expect(reviewsService.getGuideReviews).toHaveBeenCalledWith(1);
    });

    it('should return empty array when no reviews', async () => {
      const guideUserId = '1';

      mockReviewsService.getGuideReviews.mockResolvedValue([]);

      const result = await controller.getGuideReviews(guideUserId);

      expect(result).toEqual([]);
    });
  });

  describe('addGuideReview', () => {
    it('should add a guide review', async () => {
      const guideUserId = '1';
      const body = { rating: 5, text: 'Отличный гид!', photo: 'https://example.com/photo.jpg' };
      const mockRequest = { user: { userId: 3 } };
      const expectedReview = { id: 10, guideUserId: 1, userId: 3, ...body };

      mockReviewsService.addGuideReview.mockResolvedValue(expectedReview);

      const result = await controller.addGuideReview(guideUserId, mockRequest, body);

      expect(result).toEqual(expectedReview);
      expect(reviewsService.addGuideReview).toHaveBeenCalledWith(1, 3, 5, 'Отличный гид!', 'https://example.com/photo.jpg');
    });

    it('should add a guide review without photo', async () => {
      const guideUserId = '1';
      const body = { rating: 5, text: 'Отличный гид!' };
      const mockRequest = { user: { userId: 3 } };
      const expectedReview = { id: 10, guideUserId: 1, userId: 3, ...body };

      mockReviewsService.addGuideReview.mockResolvedValue(expectedReview);

      const result = await controller.addGuideReview(guideUserId, mockRequest, body);

      expect(result).toEqual(expectedReview);
      expect(reviewsService.addGuideReview).toHaveBeenCalledWith(1, 3, 5, 'Отличный гид!', undefined);
    });
  });

  describe('updateGuideReview', () => {
    it('should update a guide review', async () => {
      const reviewId = '1';
      const body = { rating: 4, text: 'Обновленный отзыв о гиде' };
      const mockRequest = { user: { userId: 3 } };
      const expectedReview = { id: 1, ...body };

      mockReviewsService.updateGuideReview.mockResolvedValue(expectedReview);

      const result = await controller.updateGuideReview(reviewId, mockRequest, body);

      expect(result).toEqual(expectedReview);
      expect(reviewsService.updateGuideReview).toHaveBeenCalledWith(1, 3, 4, 'Обновленный отзыв о гиде');
    });
  });

  describe('deleteGuideReview', () => {
    it('should delete a guide review', async () => {
      const reviewId = '1';
      const mockRequest = { user: { userId: 3 } };

      mockReviewsService.deleteGuideReview.mockResolvedValue({ message: 'Отзыв удален' });

      const result = await controller.deleteGuideReview(reviewId, mockRequest);

      expect(result).toEqual({ message: 'Отзыв удален' });
      expect(reviewsService.deleteGuideReview).toHaveBeenCalledWith(1, 3);
    });
  });
});