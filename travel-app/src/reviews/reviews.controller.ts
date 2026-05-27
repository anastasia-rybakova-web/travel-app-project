import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('places/:placeId')
  @ApiOperation({ summary: 'Получить отзывы о месте' })
  @ApiParam({ name: 'placeId', description: 'ID места' })
  @ApiResponse({ status: 200, description: 'Список отзывов' })
  async getPlaceReviews(@Param('placeId') placeId: string) {
    return this.reviewsService.getPlaceReviews(parseInt(placeId));
  }

  @Post('places/:placeId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавить отзыв о месте' })
  @ApiParam({ name: 'placeId', description: 'ID места' })
  @ApiResponse({ status: 201, description: 'Отзыв добавлен' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  async addPlaceReview(
    @Param('placeId') placeId: string,
    @Request() req,
    @Body() body: { rating: number; text: string; photo?: string },
  ) {
    return this.reviewsService.addPlaceReview(
      parseInt(placeId),
      req.user.userId,
      body.rating,
      body.text,
      body.photo,
    );
  }

  @Put('places/:reviewId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить отзыв о месте' })
  @ApiParam({ name: 'reviewId', description: 'ID отзыва' })
  @ApiResponse({ status: 200, description: 'Отзыв обновлен' })
  async updatePlaceReview(
    @Param('reviewId') reviewId: string,
    @Request() req,
    @Body() body: { rating: number; text: string },
  ) {
    return this.reviewsService.updatePlaceReview(
      parseInt(reviewId),
      req.user.userId,
      body.rating,
      body.text,
    );
  }

  @Delete('places/:reviewId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить отзыв о месте' })
  @ApiParam({ name: 'reviewId', description: 'ID отзыва' })
  @ApiResponse({ status: 200, description: 'Отзыв удален' })
  async deletePlaceReview(@Param('reviewId') reviewId: string, @Request() req) {
    return this.reviewsService.deletePlaceReview(parseInt(reviewId), req.user.userId);
  }

  @Get('routes/:routeId')
  @ApiOperation({ summary: 'Получить отзывы о маршруте' })
  @ApiParam({ name: 'routeId', description: 'ID маршрута' })
  @ApiResponse({ status: 200, description: 'Список отзывов' })
  async getRouteReviews(@Param('routeId') routeId: string) {
    return this.reviewsService.getRouteReviews(parseInt(routeId));
  }

  @Post('routes/:routeId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавить отзыв о маршруте' })
  @ApiParam({ name: 'routeId', description: 'ID маршрута' })
  @ApiResponse({ status: 201, description: 'Отзыв добавлен' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  async addRouteReview(
    @Param('routeId') routeId: string,
    @Request() req,
    @Body() body: { rating: number; text: string; photo?: string },
  ) {
    return this.reviewsService.addRouteReview(
      parseInt(routeId),
      req.user.userId,
      body.rating,
      body.text,
      body.photo,
    );
  }

  @Put('routes/:reviewId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить отзыв о маршруте' })
  @ApiParam({ name: 'reviewId', description: 'ID отзыва' })
  @ApiResponse({ status: 200, description: 'Отзыв обновлен' })
  async updateRouteReview(
    @Param('reviewId') reviewId: string,
    @Request() req,
    @Body() body: { rating: number; text: string },
  ) {
    return this.reviewsService.updateRouteReview(
      parseInt(reviewId),
      req.user.userId,
      body.rating,
      body.text,
    );
  }

  @Delete('routes/:reviewId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить отзыв о маршруте' })
  @ApiParam({ name: 'reviewId', description: 'ID отзыва' })
  @ApiResponse({ status: 200, description: 'Отзыв удален' })
  async deleteRouteReview(@Param('reviewId') reviewId: string, @Request() req) {
    return this.reviewsService.deleteRouteReview(parseInt(reviewId), req.user.userId);
  }

  @Get('guides/:guideUserId')
  @ApiOperation({ summary: 'Получить отзывы о гиде' })
  @ApiParam({ name: 'guideUserId', description: 'ID гида' })
  @ApiResponse({ status: 200, description: 'Список отзывов' })
  async getGuideReviews(@Param('guideUserId') guideUserId: string) {
    return this.reviewsService.getGuideReviews(parseInt(guideUserId));
  }

  @Post('guides/:guideUserId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавить отзыв о гиде' })
  @ApiParam({ name: 'guideUserId', description: 'ID гида' })
  @ApiResponse({ status: 201, description: 'Отзыв добавлен' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  async addGuideReview(
    @Param('guideUserId') guideUserId: string,
    @Request() req,
    @Body() body: { rating: number; text: string; photo?: string },
  ) {
    return this.reviewsService.addGuideReview(
      parseInt(guideUserId),
      req.user.userId,
      body.rating,
      body.text,
      body.photo,
    );
  }

  @Put('guides/:reviewId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить отзыв о гиде' })
  @ApiParam({ name: 'reviewId', description: 'ID отзыва' })
  @ApiResponse({ status: 200, description: 'Отзыв обновлен' })
  async updateGuideReview(
    @Param('reviewId') reviewId: string,
    @Request() req,
    @Body() body: { rating: number; text: string },
  ) {
    return this.reviewsService.updateGuideReview(
      parseInt(reviewId),
      req.user.userId,
      body.rating,
      body.text,
    );
  }

  @Delete('guides/:reviewId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить отзыв о гиде' })
  @ApiParam({ name: 'reviewId', description: 'ID отзыва' })
  @ApiResponse({ status: 200, description: 'Отзыв удален' })
  async deleteGuideReview(@Param('reviewId') reviewId: string, @Request() req) {
    return this.reviewsService.deleteGuideReview(parseInt(reviewId), req.user.userId);
  }
}