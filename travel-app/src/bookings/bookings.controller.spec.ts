import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';

describe('BookingsController', () => {
  let controller: BookingsController;
  let bookingsService: BookingsService;

  const mockBookingsService = {
    createBooking: jest.fn(),
    getBookingsByGuide: jest.fn(),
    getBookingsByTourist: jest.fn(),
    getBookingsByRoute: jest.fn(),
    hasUserCompletedRoute: jest.fn(),
    updateBookingStatus: jest.fn(),
    requestCancel: jest.fn(),
    rejectCancelRequest: jest.fn(),
    completeBooking: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [
        {
          provide: BookingsService,
          useValue: mockBookingsService,
        },
      ],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
    bookingsService = module.get<BookingsService>(BookingsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createBooking', () => {
    it('should create a new booking', async () => {
      const createDto = {
        routeId: 1,
        guideUserId: 1,
        date: '2026-06-13',
        people: 2,
        fio: 'Иванов И.И.',
        phone: '+375291234567',
        email: 'ivanov@mail.ru',
        note: 'Особых пожеланий нет',
      };
      const mockRequest = { user: { userId: 3 } };
      const expectedBooking = { id: 10, touristUserId: 3, ...createDto };

      mockBookingsService.createBooking.mockResolvedValue(expectedBooking);

      const result = await controller.createBooking(createDto, mockRequest);

      expect(result).toEqual(expectedBooking);
      expect(bookingsService.createBooking).toHaveBeenCalledWith({
        ...createDto,
        touristUserId: 3,
      });
    });
  });

  describe('getBookingsByGuide', () => {
    it('should return bookings for a guide', async () => {
      const guideUserId = '1';
      const expectedBookings = [
        { id: 1, routeId: 1, touristUserId: 3, status: 'pending' },
        { id: 2, routeId: 2, touristUserId: 4, status: 'confirmed' },
      ];

      mockBookingsService.getBookingsByGuide.mockResolvedValue(expectedBookings);

      const result = await controller.getBookingsByGuide(guideUserId);

      expect(result).toEqual(expectedBookings);
      expect(bookingsService.getBookingsByGuide).toHaveBeenCalledWith(1);
    });
  });

  describe('getBookingsByTourist', () => {
    it('should return bookings for a tourist', async () => {
      const touristUserId = '3';
      const mockRequest = { user: { userId: 3 } };
      const expectedBookings = [
        { id: 1, routeId: 1, guideUserId: 1, status: 'pending' },
        { id: 2, routeId: 2, guideUserId: 1, status: 'confirmed' },
      ];

      mockBookingsService.getBookingsByTourist.mockResolvedValue(expectedBookings);

      const result = await controller.getBookingsByTourist(touristUserId, mockRequest);

      expect(result).toEqual(expectedBookings);
      expect(bookingsService.getBookingsByTourist).toHaveBeenCalledWith(3);
    });

    it('should throw error when accessing other user bookings', async () => {
      const touristUserId = '5';
      const mockRequest = { user: { userId: 3 } };

      await expect(controller.getBookingsByTourist(touristUserId, mockRequest)).rejects.toThrow(
        'Нет доступа к чужим бронированиям',
      );
    });
  });

  describe('getBookingsByRoute', () => {
    it('should return bookings for route on a date', async () => {
      const routeId = '1';
      const date = '2026-06-13';
      const expectedBookings = [
        { id: 1, touristUserId: 3, people: 2, status: 'confirmed' },
      ];

      mockBookingsService.getBookingsByRoute.mockResolvedValue(expectedBookings);

      const result = await controller.getBookingsByRoute(routeId, date);

      expect(result).toEqual(expectedBookings);
      expect(bookingsService.getBookingsByRoute).toHaveBeenCalledWith(1, date);
    });
  });

  describe('hasUserCompletedRoute', () => {
    it('should return true if user completed route', async () => {
      const routeId = '1';
      const mockRequest = { user: { userId: 3 } };

      mockBookingsService.hasUserCompletedRoute.mockResolvedValue(true);

      const result = await controller.hasUserCompletedRoute(mockRequest, routeId);

      expect(result).toBe(true);
      expect(bookingsService.hasUserCompletedRoute).toHaveBeenCalledWith(3, 1);
    });
  });

  describe('updateStatus', () => {
    it('should update booking status', async () => {
      const bookingId = '1';
      const status = 'confirmed';
      const expectedBooking = { id: 1, status: 'confirmed' };

      mockBookingsService.updateBookingStatus.mockResolvedValue(expectedBooking);

      const result = await controller.updateStatus(bookingId, status);

      expect(result).toEqual(expectedBooking);
      expect(bookingsService.updateBookingStatus).toHaveBeenCalledWith(1, status);
    });
  });

  describe('requestCancel', () => {
    it('should request cancellation', async () => {
      const bookingId = '1';
      const reason = 'Изменение планов';
      const requestedBy = 'tourist';
      const expectedResult = { message: 'Запрос на отмену отправлен' };

      mockBookingsService.requestCancel.mockResolvedValue(expectedResult);

      const result = await controller.requestCancel(bookingId, reason, requestedBy);

      expect(result).toEqual(expectedResult);
      expect(bookingsService.requestCancel).toHaveBeenCalledWith(1, reason, requestedBy);
    });
  });

  describe('rejectCancelRequest', () => {
    it('should reject cancellation request', async () => {
      const bookingId = '1';
      const expectedResult = { message: 'Запрос на отмену отклонен' };

      mockBookingsService.rejectCancelRequest.mockResolvedValue(expectedResult);

      const result = await controller.rejectCancelRequest(bookingId);

      expect(result).toEqual(expectedResult);
      expect(bookingsService.rejectCancelRequest).toHaveBeenCalledWith(1);
    });
  });

  describe('completeBooking', () => {
    it('should complete booking', async () => {
      const bookingId = '1';
      const expectedBooking = { id: 1, status: 'done', completedAt: new Date() };

      mockBookingsService.completeBooking.mockResolvedValue(expectedBooking);

      const result = await controller.completeBooking(bookingId);

      expect(result).toEqual(expectedBooking);
      expect(bookingsService.completeBooking).toHaveBeenCalledWith(1);
    });
  });
});