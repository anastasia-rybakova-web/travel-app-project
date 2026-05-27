import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { GuidesService } from './guides.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('guides')
@Controller('guides')
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех гидов с количеством маршрутов' })
  @ApiResponse({ status: 200, description: 'Список гидов' })
  async findAll() {
    return this.guidesService.getAllGuidesWithRoutesCount();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Получить информацию о гиде по ID' })
  @ApiParam({ name: 'userId', description: 'ID гида' })
  @ApiResponse({ status: 200, description: 'Информация о гиде' })
  @ApiResponse({ status: 404, description: 'Гид не найден' })
  async findOne(@Param('userId') userId: string) {
    return this.guidesService.findOne(parseInt(userId, 10));
  }

  @Get('profile/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить профиль гида (для редактирования)' })
  @ApiParam({ name: 'userId', description: 'ID гида' })
  @ApiResponse({ status: 200, description: 'Профиль гида' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  async getProfile(@Param('userId') userId: string) {
    return this.guidesService.getGuideProfile(parseInt(userId, 10));
  }

  @Put('profile/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить профиль гида' })
  @ApiParam({ name: 'userId', description: 'ID гида' })
  @ApiResponse({ status: 200, description: 'Профиль обновлен' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  async updateProfile(@Param('userId') userId: string, @Body() updateData: any) {
    return this.guidesService.updateGuideProfile(parseInt(userId, 10), updateData);
  }
}