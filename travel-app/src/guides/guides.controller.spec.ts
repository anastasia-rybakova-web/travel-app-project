import { Test, TestingModule } from '@nestjs/testing';
import { GuidesController } from './guides.controller';
import { GuidesService } from './guides.service';

describe('GuidesController', () => {
  let controller: GuidesController;
  let guidesService: GuidesService;

  const mockGuidesService = {
    findAll: jest.fn(),
    getAllGuidesWithRoutesCount: jest.fn(),
    findOne: jest.fn(),
    getGuideProfile: jest.fn(),
    updateGuideProfile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuidesController],
      providers: [
        {
          provide: GuidesService,
          useValue: mockGuidesService,
        },
      ],
    }).compile();

    controller = module.get<GuidesController>(GuidesController);
    guidesService = module.get<GuidesService>(GuidesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all guides with routes count', async () => {
      const expectedGuides = [
        { userId: 1, name: 'Guide 1', routesCount: 3 },
        { userId: 2, name: 'Guide 2', routesCount: 1 },
      ];

      mockGuidesService.getAllGuidesWithRoutesCount.mockResolvedValue(expectedGuides);

      const result = await controller.findAll();

      expect(result).toEqual(expectedGuides);
      expect(guidesService.getAllGuidesWithRoutesCount).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return guide by id', async () => {
      const guideId = '1';
      const expectedGuide = {
        userId: 1,
        name: 'Anastasia R.',
        about: 'Опытный гид',
        phone: '+375291234567',
        email: 'guide@mail.ru',
        photo: 'https://example.com/photo.jpg',
        rating: 4.5,
        routes: [],
      };

      mockGuidesService.findOne.mockResolvedValue(expectedGuide);

      const result = await controller.findOne(guideId);

      expect(result).toEqual(expectedGuide);
      expect(guidesService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw error when guide not found', async () => {
      const guideId = '999';

      mockGuidesService.findOne.mockRejectedValue(new Error('Гид не найден'));

      await expect(controller.findOne(guideId)).rejects.toThrow('Гид не найден');
    });
  });

  describe('getProfile', () => {
    it('should return guide profile', async () => {
      const userId = '1';
      const expectedProfile = {
        userId: 1,
        name: 'Anastasia R.',
        about: 'Опытный гид',
        phone: '+375291234567',
        email: 'guide@mail.ru',
        photo: 'https://example.com/photo.jpg',
        rating: 4.5,
      };

      mockGuidesService.getGuideProfile.mockResolvedValue(expectedProfile);

      const result = await controller.getProfile(userId);

      expect(result).toEqual(expectedProfile);
      expect(guidesService.getGuideProfile).toHaveBeenCalledWith(1);
    });
  });

  describe('updateProfile', () => {
    it('should update guide profile', async () => {
      const userId = '1';
      const updateData = { name: 'Updated Name', about: 'New about' };
      const expectedUpdated = { userId: 1, ...updateData };

      mockGuidesService.updateGuideProfile.mockResolvedValue(expectedUpdated);

      const result = await controller.updateProfile(userId, updateData);

      expect(result).toEqual(expectedUpdated);
      expect(guidesService.updateGuideProfile).toHaveBeenCalledWith(1, updateData);
    });
  });
});