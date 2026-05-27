import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PlacesService } from './places.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('places')
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех мест' })
  @ApiResponse({ status: 200, description: 'Список мест' })
  async findAll() {
    return this.placesService.findAll();
  }

  @Get('best')
  @ApiOperation({ summary: 'Получить лучшие места (по рейтингу)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Количество мест' })
  @ApiResponse({ status: 200, description: 'Список лучших мест' })
  async getBestPlaces(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 8;
     const finalLimit = isNaN(limitNum) ? 8 : limitNum;
    return this.placesService.getBestPlaces(limitNum);
  }

  @Get('region/:region')
  @ApiOperation({ summary: 'Получить места по области' })
  @ApiParam({ name: 'region', description: 'Название области' })
  @ApiResponse({ status: 200, description: 'Список мест в области' })
  async getPlacesByRegion(@Param('region') region: string) {
    return this.placesService.getPlacesByRegion(region);
  }

  @Get('guide/:guideUserId')
  @ApiOperation({ summary: 'Получить места, созданные гидом' })
  @ApiParam({ name: 'guideUserId', description: 'ID гида' })
  @ApiResponse({ status: 200, description: 'Список мест' })
  async getPlacesByGuide(@Param('guideUserId') guideUserId: string) {
    return this.placesService.getPlacesByGuide(parseInt(guideUserId, 10));
  }


  @Get('search')
@ApiOperation({ summary: 'Поиск мест по параметрам' })
@ApiQuery({ name: 'keyword', required: false, description: 'Ключевое слово' })
@ApiQuery({ name: 'region', required: false, description: 'Область' })
@ApiQuery({ name: 'tag', required: false, description: 'Тег' })
@ApiQuery({ name: 'rating', required: false, description: 'Минимальный рейтинг' })
@ApiResponse({ status: 200, description: 'Результаты поиска' })
async searchPlaces(
  @Query('keyword') keyword?: string,
  @Query('region') region?: string,
  @Query('tag') tag?: string,
  @Query('rating') rating?: string,
) {
  const ratingNum = rating ? parseFloat(rating) : undefined;
  const finalRating = (ratingNum !== undefined && isNaN(ratingNum)) ? undefined : ratingNum;
  return this.placesService.searchPlaces({ keyword, region, tag, rating: finalRating });
}

  @Get(':id')
  @ApiOperation({ summary: 'Получить место по ID' })
  @ApiParam({ name: 'id', description: 'ID места' })
  @ApiResponse({ status: 200, description: 'Информация о месте' })
  @ApiResponse({ status: 404, description: 'Место не найдено' })
  async findOne(@Param('id') id: string) {
    return this.placesService.findOne(parseInt(id, 10));
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('guide')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать новое место (только для гидов)' })
  @ApiResponse({ status: 201, description: 'Место создано' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ только для гидов' })
  async create(@Body() createPlaceDto: any) {
    return this.placesService.createPlace(createPlaceDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('guide')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить место (только для гидов)' })
  @ApiParam({ name: 'id', description: 'ID места' })
  @ApiResponse({ status: 200, description: 'Место обновлено' })
  async update(@Param('id') id: string, @Body() updateData: any) {
    return this.placesService.updatePlace(parseInt(id, 10), updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('guide')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить место (только для гидов)' })
  @ApiParam({ name: 'id', description: 'ID места' })
  @ApiResponse({ status: 200, description: 'Место удалено' })
  async delete(@Param('id') id: string) {
    return this.placesService.deletePlace(parseInt(id, 10));
  }

  @Get(':id/reviews')
  @ApiOperation({ summary: 'Получить отзывы о месте' })
  @ApiParam({ name: 'id', description: 'ID места' })
  @ApiResponse({ status: 200, description: 'Список отзывов' })
  async getPlaceReviews(@Param('id') id: string) {
    return this.placesService.getPlaceReviews(parseInt(id, 10));
  }

  @Post(':id/reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавить отзыв о месте' })
  @ApiParam({ name: 'id', description: 'ID места' })
  @ApiResponse({ status: 201, description: 'Отзыв добавлен' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  async addPlaceReview(
    @Param('id') id: string,
    @Body() reviewData: any,
    @Request() req,
  ) {
    return this.placesService.addPlaceReview(parseInt(id, 10), reviewData, req.user.userId);
  }

  @Put('reviews/:reviewId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить отзыв о месте' })
  @ApiParam({ name: 'reviewId', description: 'ID отзыва' })
  @ApiResponse({ status: 200, description: 'Отзыв обновлен' })
  async updatePlaceReview(
    @Param('reviewId') reviewId: string,
    @Body() reviewData: any,
    @Request() req,
  ) {
    return this.placesService.updatePlaceReview(parseInt(reviewId, 10), reviewData, req.user.userId);
  }

  @Delete('reviews/:reviewId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить отзыв о месте' })
  @ApiParam({ name: 'reviewId', description: 'ID отзыва' })
  @ApiResponse({ status: 200, description: 'Отзыв удален' })
  async deletePlaceReview(
    @Param('reviewId') reviewId: string,
    @Request() req,
  ) {
    return this.placesService.deletePlaceReview(parseInt(reviewId, 10), req.user.userId);
  }
}