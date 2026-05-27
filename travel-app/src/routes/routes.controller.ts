import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { RoutesService } from './routes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('routes')
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех маршрутов' })
  @ApiResponse({ status: 200, description: 'Список маршрутов' })
  async findAll() {
    return this.routesService.findAll();
  }

  @Get('popular')
@ApiOperation({ summary: 'Получить популярные маршруты (по рейтингу)' })
@ApiQuery({ name: 'limit', required: false, description: 'Количество маршрутов' })
@ApiResponse({ status: 200, description: 'Список популярных маршрутов' })
async getPopularRoutes(@Query('limit') limit?: string) {
  const limitNum = limit ? parseInt(limit, 10) : 6;
  const finalLimit = isNaN(limitNum) ? 6 : limitNum;
  return this.routesService.getPopularRoutes(finalLimit);
}
  @Get('guide/:guideUserId')
  @ApiOperation({ summary: 'Получить маршруты гида' })
  @ApiParam({ name: 'guideUserId', description: 'ID гида' })
  @ApiResponse({ status: 200, description: 'Список маршрутов гида' })
  async getRoutesByGuide(@Param('guideUserId') guideUserId: string) {
    return this.routesService.getRoutesByGuide(parseInt(guideUserId, 10));
  }

  @Get('search')
@ApiOperation({ summary: 'Поиск маршрутов по ключевым словам' })
@ApiQuery({ name: 'keyword', required: false, description: 'Ключевое слово' })
@ApiQuery({ name: 'routeType', required: false, description: 'Тип маршрута' })
@ApiQuery({ name: 'minPrice', required: false, description: 'Минимальная цена' })
@ApiResponse({ status: 200, description: 'Результаты поиска' })
async searchRoutes(
  @Query('keyword') keyword?: string,
  @Query('routeType') routeType?: string,
  @Query('minPrice') minPrice?: string,
) {
  let minPriceNum = minPrice ? parseInt(minPrice, 10) : undefined;
  if (minPriceNum !== undefined && isNaN(minPriceNum)) {
    minPriceNum = undefined;
  }
  return this.routesService.searchRoutes(keyword, routeType, minPriceNum);
}

  @Get('search/filters')
@ApiOperation({ summary: 'Расширенный поиск маршрутов' })
@ApiQuery({ name: 'keyword', required: false, description: 'Ключевое слово' })
@ApiQuery({ name: 'type', required: false, description: 'Тип маршрута' })
@ApiQuery({ name: 'price', required: false, description: 'Максимальная цена' })
@ApiQuery({ name: 'rating', required: false, description: 'Минимальный рейтинг' })
@ApiQuery({ name: 'startDate', required: false, description: 'Дата начала' })
@ApiQuery({ name: 'endDate', required: false, description: 'Дата окончания' })
@ApiResponse({ status: 200, description: 'Результаты поиска' })
async getWithFilters(
  @Query('keyword') keyword?: string,
  @Query('type') type?: string,
  @Query('price') price?: string,
  @Query('rating') rating?: string,
  @Query('startDate') startDate?: string,
  @Query('endDate') endDate?: string,
) {
  let priceNum = price ? parseFloat(price) : undefined;
  let ratingNum = rating ? parseFloat(rating) : undefined;
  
  if (priceNum !== undefined && isNaN(priceNum)) priceNum = undefined;
  if (ratingNum !== undefined && isNaN(ratingNum)) ratingNum = undefined;
  
  return this.routesService.getAllWithFilters({
    keyword,
    type,
    price: priceNum,
    rating: ratingNum,
    startDate,
    endDate,
  });
}

  @Get(':id')
  @ApiOperation({ summary: 'Получить маршрут по ID' })
  @ApiParam({ name: 'id', description: 'ID маршрута' })
  @ApiResponse({ status: 200, description: 'Информация о маршруте' })
  @ApiResponse({ status: 404, description: 'Маршрут не найден' })
  async findOne(@Param('id') id: string) {
    return this.routesService.findOne(parseInt(id, 10));
  }

  @Get(':id/full')
  @ApiOperation({ summary: 'Получить маршрут со всеми данными (места, даты, отзывы)' })
  @ApiParam({ name: 'id', description: 'ID маршрута' })
  @ApiResponse({ status: 200, description: 'Полная информация о маршруте' })
  async getRouteWithAllData(@Param('id') id: string) {
    return this.routesService.getRouteWithAllData(parseInt(id, 10));
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('guide')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать новый маршрут (только для гидов)' })
  @ApiResponse({ status: 201, description: 'Маршрут создан' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ только для гидов' })
  async create(@Body() createRouteDto: any) {
    return this.routesService.createRoute(createRouteDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('guide')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить маршрут (только для гидов)' })
  @ApiParam({ name: 'id', description: 'ID маршрута' })
  @ApiResponse({ status: 200, description: 'Маршрут обновлен' })
  async update(@Param('id') id: string, @Body() updateData: any) {
    return this.routesService.updateRoute(parseInt(id, 10), updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('guide')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить маршрут (только для гидов)' })
  @ApiParam({ name: 'id', description: 'ID маршрута' })
  @ApiResponse({ status: 200, description: 'Маршрут удален' })
  async delete(@Param('id') id: string) {
    return this.routesService.deleteRoute(parseInt(id, 10));
  }

  @Get(':routeId/reviews')
  @ApiOperation({ summary: 'Получить отзывы о маршруте' })
  @ApiParam({ name: 'routeId', description: 'ID маршрута' })
  @ApiResponse({ status: 200, description: 'Список отзывов' })
  async getRouteReviews(@Param('routeId') routeId: string) {
    return this.routesService.getRouteReviews(parseInt(routeId, 10));
  }

  @Post(':routeId/reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавить отзыв о маршруте' })
  @ApiParam({ name: 'routeId', description: 'ID маршрута' })
  @ApiResponse({ status: 201, description: 'Отзыв добавлен' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  async addRouteReview(
    @Param('routeId') routeId: string,
    @Request() req,
    @Body('rating') rating: number,
    @Body('text') text: string,
  ) {
    return this.routesService.addRouteReview(parseInt(routeId, 10), req.user.userId, rating, text);
  }

  @Put('reviews/:reviewId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить отзыв о маршруте' })
  @ApiParam({ name: 'reviewId', description: 'ID отзыва' })
  @ApiResponse({ status: 200, description: 'Отзыв обновлен' })
  async updateRouteReview(
    @Param('reviewId') reviewId: string,
    @Request() req,
    @Body('rating') rating: number,
    @Body('text') text: string,
  ) {
    return this.routesService.updateRouteReview(parseInt(reviewId, 10), req.user.userId, rating, text);
  }

  @Delete('reviews/:reviewId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить отзыв о маршруте' })
  @ApiParam({ name: 'reviewId', description: 'ID отзыва' })
  @ApiResponse({ status: 200, description: 'Отзыв удален' })
  async deleteRouteReview(@Param('reviewId') reviewId: string, @Request() req) {
    return this.routesService.deleteRouteReview(parseInt(reviewId, 10), req.user.userId);
  }
}