import { Test, TestingModule } from '@nestjs/testing';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';

describe('PlacesController', () => {
  let controller: PlacesController;
  let placesService: PlacesService;

  const mockPlacesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    getBestPlaces: jest.fn(),
    getPlacesByRegion: jest.fn(),
    getPlacesByGuide: jest.fn(),
    searchPlaces: jest.fn(),
    createPlace: jest.fn(),
    updatePlace: jest.fn(),
    deletePlace: jest.fn(),
    getPlaceReviews: jest.fn(),
    addPlaceReview: jest.fn(),
    updatePlaceReview: jest.fn(),
    deletePlaceReview: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacesController],
      providers: [
        {
          provide: PlacesService,
          useValue: mockPlacesService, 
        },
      ],
    }).compile();

    controller = module.get<PlacesController>(PlacesController);
    placesService = module.get<PlacesService>(PlacesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all places', async () => {
      const expectedPlaces = [
        { id: 1, title: 'Мирский замок', region: 'Гродненская обл.' },
        { id: 2, title: 'Коссовский замок', region: 'Брестская область' },
      ];

      mockPlacesService.findAll.mockResolvedValue(expectedPlaces);

      const result = await controller.findAll();

      expect(result).toEqual(expectedPlaces);
      expect(placesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return place by id', async () => {
      const placeId = '1';
      const expectedPlace = {
        id: 1,
        title: 'Мирский замок',
        address: 'Мир, Красноармейская ул. 2',
        region: 'Гродненская обл.',
        rating: 4.5,
      };

      mockPlacesService.findOne.mockResolvedValue(expectedPlace);

      const result = await controller.findOne(placeId);

      expect(result).toEqual(expectedPlace);
      expect(placesService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw error when place not found', async () => {
      const placeId = '999';

      mockPlacesService.findOne.mockRejectedValue(new Error('Место не найдено'));

      await expect(controller.findOne(placeId)).rejects.toThrow('Место не найдено');
    });
  });

  describe('getBestPlaces', () => {
    it('should return best places with default limit', async () => {
      const expectedPlaces = [
        { id: 1, title: 'Мирский замок', rating: 4.5 },
        { id: 2, title: 'Коссовский замок', rating: 4.3 },
      ];

      mockPlacesService.getBestPlaces.mockResolvedValue(expectedPlaces);

      const result = await controller.getBestPlaces();

      expect(result).toEqual(expectedPlaces);
      expect(placesService.getBestPlaces).toHaveBeenCalledWith(8);
    });

    it('should return best places with custom limit', async () => {
      const limit = '5';

      mockPlacesService.getBestPlaces.mockResolvedValue([]);

      await controller.getBestPlaces(limit);

      expect(placesService.getBestPlaces).toHaveBeenCalledWith(5);
    });

    it('should handle invalid limit parameter', async () => {
      const limit = 'invalid';

      mockPlacesService.getBestPlaces.mockResolvedValue([]);

      await controller.getBestPlaces(limit);

      expect(placesService.getBestPlaces).toHaveBeenCalled();
    });
  });

  describe('getPlacesByRegion', () => {
    it('should return places by region', async () => {
      const region = 'Гродненская';
      const expectedPlaces = [
        { id: 1, title: 'Мирский замок', region: 'Гродненская обл.' },
      ];

      mockPlacesService.getPlacesByRegion.mockResolvedValue(expectedPlaces);

      const result = await controller.getPlacesByRegion(region);

      expect(result).toEqual(expectedPlaces);
      expect(placesService.getPlacesByRegion).toHaveBeenCalledWith(region);
    });

    it('should return empty array when no places in region', async () => {
      const region = 'Несуществующая';

      mockPlacesService.getPlacesByRegion.mockResolvedValue([]);

      const result = await controller.getPlacesByRegion(region);

      expect(result).toEqual([]);
    });
  });

  describe('getPlacesByGuide', () => {
    it('should return places by guide id', async () => {
      const guideUserId = '1';
      const expectedPlaces = [
        { id: 1, title: 'Мирский замок', guideUserId: 1 },
        { id: 2, title: 'Коссовский замок', guideUserId: 1 },
      ];

      mockPlacesService.getPlacesByGuide.mockResolvedValue(expectedPlaces);

      const result = await controller.getPlacesByGuide(guideUserId);

      expect(result).toEqual(expectedPlaces);
      expect(placesService.getPlacesByGuide).toHaveBeenCalledWith(1);
    });

    it('should return empty array when guide has no places', async () => {
      const guideUserId = '999';

      mockPlacesService.getPlacesByGuide.mockResolvedValue([]);

      const result = await controller.getPlacesByGuide(guideUserId);

      expect(result).toEqual([]);
    });
  });

  describe('searchPlaces', () => {
    it('should search places with all filters', async () => {
      const query = { keyword: 'замок', region: 'Гродненская', tag: 'историческое', rating: '4' };
      const expectedPlaces = [{ id: 1, title: 'Мирский замок' }];

      mockPlacesService.searchPlaces.mockResolvedValue(expectedPlaces);

      const result = await controller.searchPlaces(
        query.keyword,
        query.region,
        query.tag,
        query.rating,
      );

      expect(result).toEqual(expectedPlaces);
      expect(placesService.searchPlaces).toHaveBeenCalledWith({
        keyword: 'замок',
        region: 'Гродненская',
        tag: 'историческое',
        rating: 4,
      });
    });

    it('should search places without filters', async () => {
      mockPlacesService.searchPlaces.mockResolvedValue([]);

      const result = await controller.searchPlaces();

      expect(result).toEqual([]);
      expect(placesService.searchPlaces).toHaveBeenCalledWith({
        keyword: undefined,
        region: undefined,
        tag: undefined,
        rating: undefined,
      });
    });

    it('should search places with only keyword', async () => {
      const keyword = 'замок';

      mockPlacesService.searchPlaces.mockResolvedValue([]);

      await controller.searchPlaces(keyword);

      expect(placesService.searchPlaces).toHaveBeenCalledWith({
        keyword: 'замок',
        region: undefined,
        tag: undefined,
        rating: undefined,
      });
    });

    it('should handle invalid rating parameter', async () => {
      const rating = 'invalid';

      mockPlacesService.searchPlaces.mockResolvedValue([]);

      await controller.searchPlaces(undefined, undefined, undefined, rating);

      expect(placesService.searchPlaces).toHaveBeenCalled();
    });
  });

  describe('createPlace', () => {
    it('should create a new place', async () => {
      const createDto = {
        title: 'Новое место',
        address: 'г. Минск, ул. Примерная, 1',
        region: 'Минская',
        shortDescription: 'Новое интересное место',
        description: 'Полное описание нового места',
        tags: ['Культура'],
        photos: ['https://example.com/photo.jpg'],
        guideUserId: 1,
      };
      const expectedPlace = { id: 10, ...createDto };

      mockPlacesService.createPlace.mockResolvedValue(expectedPlace);

      const result = await controller.create(createDto);

      expect(result).toEqual(expectedPlace);
      expect(placesService.createPlace).toHaveBeenCalledWith(createDto);
    });
  });

  describe('updatePlace', () => {
    it('should update place', async () => {
      const placeId = '1';
      const updateData = { title: 'Обновленное название', rating: 5 };
      const expectedUpdated = { id: 1, ...updateData };

      mockPlacesService.updatePlace.mockResolvedValue(expectedUpdated);

      const result = await controller.update(placeId, updateData);

      expect(result).toEqual(expectedUpdated);
      expect(placesService.updatePlace).toHaveBeenCalledWith(1, updateData);
    });
  });

  describe('deletePlace', () => {
    it('should delete place', async () => {
      const placeId = '1';

      mockPlacesService.deletePlace.mockResolvedValue({ message: 'Место удалено' });

      await controller.delete(placeId);

      expect(placesService.deletePlace).toHaveBeenCalledWith(1);
    });
  });

  describe('getPlaceReviews', () => {
    it('should return reviews for a place', async () => {
      const placeId = '1';
      const expectedReviews = [
        { id: 1, userId: 1, username: 'user1', rating: 5, text: 'Отлично!' },
        { id: 2, userId: 2, username: 'user2', rating: 4, text: 'Хорошо' },
      ];

      mockPlacesService.getPlaceReviews.mockResolvedValue(expectedReviews);

      const result = await controller.getPlaceReviews(placeId);

      expect(result).toEqual(expectedReviews);
      expect(placesService.getPlaceReviews).toHaveBeenCalledWith(1);
    });

    it('should return empty array when no reviews', async () => {
      const placeId = '1';

      mockPlacesService.getPlaceReviews.mockResolvedValue([]);

      const result = await controller.getPlaceReviews(placeId);

      expect(result).toEqual([]);
    });
  });

  describe('addPlaceReview', () => {
    it('should add review for a place', async () => {
      const placeId = '1';
      const reviewData = { rating: 5, text: 'Отличное место!' };
      const mockRequest = { user: { userId: 1 } };
      const expectedReview = { id: 10, placeId: 1, userId: 1, ...reviewData };

      mockPlacesService.addPlaceReview.mockResolvedValue(expectedReview);

      const result = await controller.addPlaceReview(placeId, reviewData, mockRequest);

      expect(result).toEqual(expectedReview);
      expect(placesService.addPlaceReview).toHaveBeenCalledWith(1, reviewData, 1);
    });
  });

  describe('updatePlaceReview', () => {
    it('should update a place review', async () => {
      const reviewId = '1';
      const reviewData = { rating: 4, text: 'Обновленный отзыв' };
      const mockRequest = { user: { userId: 1 } };
      const expectedReview = { id: 1, ...reviewData };

      mockPlacesService.updatePlaceReview.mockResolvedValue(expectedReview);

      const result = await controller.updatePlaceReview(reviewId, reviewData, mockRequest);

      expect(result).toEqual(expectedReview);
      expect(placesService.updatePlaceReview).toHaveBeenCalledWith(1, reviewData, 1);
    });
  });

  describe('deletePlaceReview', () => {
    it('should delete a place review', async () => {
      const reviewId = '1';
      const mockRequest = { user: { userId: 1 } };

      mockPlacesService.deletePlaceReview.mockResolvedValue({ message: 'Отзыв удален' });

      const result = await controller.deletePlaceReview(reviewId, mockRequest);

      expect(result).toEqual({ message: 'Отзыв удален' });
      expect(placesService.deletePlaceReview).toHaveBeenCalledWith(1, 1);
    });
  });
});