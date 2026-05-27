import { Test, TestingModule } from '@nestjs/testing';
import { TouristsController } from './tourists.controller';
import { TouristsService } from './tourists.service';

describe('TouristsController', () => {
  let controller: TouristsController;
  let touristsService: TouristsService;

  const mockTouristsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    getTouristProfile: jest.fn(),
    updateTouristProfile: jest.fn(),
    getTouristBookings: jest.fn(),
    getTouristHistory: jest.fn(),
    getTouristUpcoming: jest.fn(),
    getTouristPendingBookings: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TouristsController],
      providers: [
        {
          provide: TouristsService,
          useValue: mockTouristsService,
        },
      ],
    }).compile();

    controller = module.get<TouristsController>(TouristsController);
    touristsService = module.get<TouristsService>(TouristsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all tourists', async () => {
      const expectedTourists = [
        { userId: 3, name: 'lida', photo: 'https://example.com/photo.jpg', email: ''  },
        { userId: 4, name: 'lida_makeenok', photo: '', email: ''  },
      ];

      mockTouristsService.findAll.mockResolvedValue(expectedTourists);

      const result = await controller.findAll();

      expect(result).toEqual(expectedTourists);
      expect(touristsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return tourist by id', async () => {
      const userId = '3';
      const expectedTourist = {
        userId: 3,
        name: 'lida',
        photo: 'https://encrypted-tbn0.gstatic.com/images',
        email: '' ,
      };

      mockTouristsService.findOne.mockResolvedValue(expectedTourist);

      const result = await controller.findOne(userId);

      expect(result).toEqual(expectedTourist);
      expect(touristsService.findOne).toHaveBeenCalledWith(3);
    });

    it('should throw error when tourist not found', async () => {
      const userId = '999';

      mockTouristsService.findOne.mockRejectedValue(new Error('Турист не найден'));

      await expect(controller.findOne(userId)).rejects.toThrow('Турист не найден');
    });
  });

  describe('getProfile', () => {
    it('should return tourist profile', async () => {
      const userId = '3';
      const expectedProfile = {
        userId: 3,
        name: 'lida',
        photo: 'https://encrypted-tbn0.gstatic.com/images',
        email: '',
      };

      mockTouristsService.getTouristProfile.mockResolvedValue(expectedProfile);

      const result = await controller.getProfile(userId);

      expect(result).toEqual(expectedProfile);
      expect(touristsService.getTouristProfile).toHaveBeenCalledWith(3);
    });
  });

  describe('updateProfile', () => {
    it('should update tourist profile', async () => {
      const userId = '3';
      const updateData = { name: 'Updated Name', photo: 'https://new-photo.jpg', email: 'new_lida@mail.ru' };
      const expectedUpdated = { userId: 3, ...updateData };

      mockTouristsService.updateTouristProfile.mockResolvedValue(expectedUpdated);

      const result = await controller.updateProfile(userId, updateData);

      expect(result).toEqual(expectedUpdated);
      expect(touristsService.updateTouristProfile).toHaveBeenCalledWith(3, updateData);
    });
  });

  describe('getTouristBookings', () => {
    it('should return all tourist bookings', async () => {
      const userId = '3';
      const expectedBookings = [
        { id: 1, routeId: 1, status: 'pending', date: '2026-07-15' },
        { id: 2, routeId: 2, status: 'confirmed', date: '2026-06-26' },
      ];

      mockTouristsService.getTouristBookings.mockResolvedValue(expectedBookings);

      const result = await controller.getTouristBookings(userId);

      expect(result).toEqual(expectedBookings);
      expect(touristsService.getTouristBookings).toHaveBeenCalledWith(3);
    });
  });

  describe('getTouristHistory', () => {
    it('should return completed tours', async () => {
      const userId = '3';
      const expectedHistory = [
        { id: 1, routeId: 2, status: 'done', date: '2026-05-13' },
        { id: 2, routeId: 2, status: 'done', date: '2026-05-07' },
      ];

      mockTouristsService.getTouristHistory.mockResolvedValue(expectedHistory);

      const result = await controller.getTouristHistory(userId);

      expect(result).toEqual(expectedHistory);
      expect(touristsService.getTouristHistory).toHaveBeenCalledWith(3);
    });
  });

  describe('getTouristUpcoming', () => {
    it('should return upcoming tours', async () => {
      const userId = '3';
      const expectedUpcoming = [
        { id: 3, routeId: 2, status: 'confirmed', date: '2026-06-26' },
      ];

      mockTouristsService.getTouristUpcoming.mockResolvedValue(expectedUpcoming);

      const result = await controller.getTouristUpcoming(userId);

      expect(result).toEqual(expectedUpcoming);
      expect(touristsService.getTouristUpcoming).toHaveBeenCalledWith(3);
    });
  });

  describe('getTouristPendingBookings', () => {
    it('should return pending bookings', async () => {
      const userId = '3';
      const expectedPending = [
        { id: 4, routeId: 1, status: 'pending', date: '2026-07-15' },
      ];

      mockTouristsService.getTouristPendingBookings.mockResolvedValue(expectedPending);

      const result = await controller.getTouristPendingBookings(userId);

      expect(result).toEqual(expectedPending);
      expect(touristsService.getTouristPendingBookings).toHaveBeenCalledWith(3);
    });
  });
});