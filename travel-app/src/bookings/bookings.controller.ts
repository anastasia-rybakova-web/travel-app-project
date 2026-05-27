import { Controller, Get, Patch, Post, Param, Body, UseGuards, Request, Query, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('bookings')
@Controller('bookings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новое бронирование' })
  @ApiResponse({ status: 201, description: 'Бронирование создано' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiBody({ schema: { example: { routeId: 1, guideUserId: 1, date: '2026-06-13', people: 2, fio: 'Иванов И.И.', phone: '+375291234567', email: 'ivanov@mail.ru', note: 'Особые пожелания' } } })
  async createBooking(@Body() createBookingDto: any, @Request() req) {
    const bookingData = {
      ...createBookingDto,
      touristUserId: req.user.userId,
    };
    return this.bookingsService.createBooking(bookingData);
  }

  @Get('guide/:guideUserId')
  @Roles('guide')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Получить бронирования гида' })
  @ApiParam({ name: 'guideUserId', description: 'ID гида' })
  @ApiResponse({ status: 200, description: 'Список бронирований' })
  @ApiResponse({ status: 403, description: 'Доступ только для гидов' })
  async getBookingsByGuide(@Param('guideUserId') guideUserId: string) {
    return this.bookingsService.getBookingsByGuide(parseInt(guideUserId, 10));
  }

  @Get('tourist/:touristUserId')
  @ApiOperation({ summary: 'Получить бронирования туриста' })
  @ApiParam({ name: 'touristUserId', description: 'ID туриста' })
  @ApiResponse({ status: 200, description: 'Список бронирований' })
  @ApiResponse({ status: 401, description: 'Нет доступа к чужим бронированиям' })
  async getBookingsByTourist(@Param('touristUserId') touristUserId: string, @Request() req) {
    if (req.user.userId !== parseInt(touristUserId)) {
      throw new UnauthorizedException('Нет доступа к чужим бронированиям');
    }
    return this.bookingsService.getBookingsByTourist(parseInt(touristUserId));
  }

  @Get('route/:routeId')
  @ApiOperation({ summary: 'Получить бронирования маршрута на конкретную дату' })
  @ApiParam({ name: 'routeId', description: 'ID маршрута' })
  @ApiQuery({ name: 'date', description: 'Дата в формате YYYY-MM-DD' })
  @ApiResponse({ status: 200, description: 'Список бронирований' })
  async getBookingsByRoute(
    @Param('routeId') routeId: string,
    @Query('date') date: string,
  ) {
    return this.bookingsService.getBookingsByRoute(parseInt(routeId, 10), date);
  }

  @Get('check-completed/:routeId')
  @ApiOperation({ summary: 'Проверить, был ли турист на маршруте (для возможности оставить отзыв)' })
  @ApiParam({ name: 'routeId', description: 'ID маршрута' })
  @ApiResponse({ status: 200, description: 'true - был, false - не был' })
  async hasUserCompletedRoute(@Request() req, @Param('routeId') routeId: string) {
    return this.bookingsService.hasUserCompletedRoute(req.user.userId, parseInt(routeId, 10));
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Обновить статус бронирования' })
  @ApiParam({ name: 'id', description: 'ID бронирования' })
  @ApiBody({ schema: { example: { status: 'confirmed' } } })
  @ApiResponse({ status: 200, description: 'Статус обновлен' })
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.bookingsService.updateBookingStatus(parseInt(id, 10), status);
  }

  @Post(':id/cancel-request')
  @ApiOperation({ summary: 'Запросить отмену бронирования' })
  @ApiParam({ name: 'id', description: 'ID бронирования' })
  @ApiBody({ schema: { example: { reason: 'Изменение планов', requestedBy: 'tourist' } } })
  @ApiResponse({ status: 200, description: 'Запрос на отмену отправлен' })
  async requestCancel(
    @Param('id') id: string,
    @Body('reason') reason: string,
    @Body('requestedBy') requestedBy: string,
  ) {
    return this.bookingsService.requestCancel(parseInt(id, 10), reason, requestedBy);
  }

  @Post(':id/reject-cancel')
  @ApiOperation({ summary: 'Отклонить запрос на отмену' })
  @ApiParam({ name: 'id', description: 'ID бронирования' })
  @ApiResponse({ status: 200, description: 'Запрос на отмену отклонен' })
  async rejectCancelRequest(@Param('id') id: string) {
    return this.bookingsService.rejectCancelRequest(parseInt(id, 10));
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Завершить бронирование' })
  @ApiParam({ name: 'id', description: 'ID бронирования' })
  @ApiResponse({ status: 200, description: 'Бронирование завершено' })
  async completeBooking(@Param('id') id: string) {
    return this.bookingsService.completeBooking(parseInt(id, 10));
  }
}