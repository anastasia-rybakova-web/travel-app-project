import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { TouristsService } from './tourists.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('tourists')
@Controller('tourists')
export class TouristsController {
  constructor(private readonly touristsService: TouristsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('guide')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить список всех туристов (только для гидов)' })
  @ApiResponse({ status: 200, description: 'Список туристов' })
  @ApiResponse({ status: 403, description: 'Доступ только для гидов' })
  async findAll() {
    return this.touristsService.findAll();
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить информацию о туристе по ID' })
  @ApiParam({ name: 'userId', description: 'ID туриста' })
  @ApiResponse({ status: 200, description: 'Информация о туристе' })
  @ApiResponse({ status: 404, description: 'Турист не найден' })
  async findOne(@Param('userId') userId: string) {
    return this.touristsService.findOne(parseInt(userId, 10));
  }

  @Get('profile/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить профиль туриста (для редактирования)' })
  @ApiParam({ name: 'userId', description: 'ID туриста' })
  @ApiResponse({ status: 200, description: 'Профиль туриста' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  async getProfile(@Param('userId') userId: string) {
    return this.touristsService.getTouristProfile(parseInt(userId, 10));
  }

  @Put('profile/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить профиль туриста' })
  @ApiParam({ name: 'userId', description: 'ID туриста' })
  @ApiResponse({ status: 200, description: 'Профиль обновлен' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  async updateProfile(@Param('userId') userId: string, @Body() updateData: any) {
    return this.touristsService.updateTouristProfile(parseInt(userId, 10), updateData);
  }

  @Get(':userId/bookings')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить все бронирования туриста' })
  @ApiParam({ name: 'userId', description: 'ID туриста' })
  @ApiResponse({ status: 200, description: 'Список бронирований' })
  async getTouristBookings(@Param('userId') userId: string) {
    return this.touristsService.getTouristBookings(parseInt(userId, 10));
  }

  @Get(':userId/history')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить историю завершенных поездок туриста' })
  @ApiParam({ name: 'userId', description: 'ID туриста' })
  @ApiResponse({ status: 200, description: 'Список завершенных поездок' })
  async getTouristHistory(@Param('userId') userId: string) {
    return this.touristsService.getTouristHistory(parseInt(userId, 10));
  }

  @Get(':userId/upcoming')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить предстоящие туры туриста' })
  @ApiParam({ name: 'userId', description: 'ID туриста' })
  @ApiResponse({ status: 200, description: 'Список предстоящих туров' })
  async getTouristUpcoming(@Param('userId') userId: string) {
    return this.touristsService.getTouristUpcoming(parseInt(userId, 10));
  }

  @Get(':userId/pending')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить заявки туриста на рассмотрении' })
  @ApiParam({ name: 'userId', description: 'ID туриста' })
  @ApiResponse({ status: 200, description: 'Список заявок на рассмотрении' })
  async getTouristPendingBookings(@Param('userId') userId: string) {
    return this.touristsService.getTouristPendingBookings(parseInt(userId, 10));
  }
}