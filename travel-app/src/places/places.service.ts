import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.place.findMany({
      include: {
        guide: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
        reviews: true,
      },
    });
  }

  async findOne(id: number) {
    const place = await this.prisma.place.findUnique({
      where: { id },
      include: {
        guide: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
        reviews: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
        routePlaces: {
          include: {
            route: true,
          },
        },
      },
    });

    if (!place) {
      throw new NotFoundException(`Место с id ${id} не найдено`);
    }

    return place;
  }

  async getBestPlaces(limit: number = 8) {
    return this.prisma.place.findMany({
      where: { rating: { gt: 0 } },
      orderBy: { rating: 'desc' },
      take: limit,
      include: {
        guide: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
      },
    });
  }

  async getPlacesByRegion(region: string) {
    return this.prisma.place.findMany({
      where: { region: { contains: region, mode: 'insensitive' } },
      include: {
        guide: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
      },
    });
  }

  async getPlacesByGuide(guideUserId: number) {
    return this.prisma.place.findMany({
      where: { guideUserId },
      include: {
        reviews: true,
      },
    });
  }

  async createPlace(data: any) {
    return this.prisma.place.create({
      data: {
        title: data.title,
        address: data.address,
        region: data.region,
        shortDescription: data.shortDescription,
        description: data.description,
        tags: data.tags || [],
        photos: data.photos || [],
        rating: data.rating || 0,
        guideUserId: data.guideUserId,
      },
      include: {
        guide: true,
      },
    });
  }

  async updatePlace(id: number, data: any) {
    await this.findOne(id);
    
    return this.prisma.place.update({
      where: { id },
      data: {
        title: data.title,
        address: data.address,
        region: data.region,
        shortDescription: data.shortDescription,
        description: data.description,
        tags: data.tags,
        photos: data.photos,
        rating: data.rating,
      },
      include: {
        guide: true,
      },
    });
  }

  async deletePlace(id: number) {
    await this.findOne(id);
    return this.prisma.place.delete({ where: { id } });
  }

  async getPlaceReviews(placeId: number) {
    return this.prisma.placeReview.findMany({
      where: { placeId },
      include: {
        user: {
          select: { username: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addPlaceReview(placeId: number, reviewData: any, userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { username: true },
    });

    const newReview = await this.prisma.placeReview.create({
      data: {
        placeId,
        userId,
        username: reviewData.username || user?.username,
        photo: reviewData.photo || null,
        rating: reviewData.rating,
        text: reviewData.text,
      },
    });

    await this.updatePlaceRating(placeId);

    return newReview;
  }

  async updatePlaceReview(reviewId: number, reviewData: any, userId: number) {
    const review = await this.prisma.placeReview.findFirst({
      where: { id: reviewId, userId },
    });

    if (!review) {
      throw new NotFoundException('Отзыв не найден или у вас нет прав');
    }

    const updatedReview = await this.prisma.placeReview.update({
      where: { id: reviewId },
      data: {
        rating: reviewData.rating,
        text: reviewData.text,
      },
    });

    await this.updatePlaceRating(review.placeId);

    return updatedReview;
  }

  async deletePlaceReview(reviewId: number, userId: number) {
    const review = await this.prisma.placeReview.findFirst({
      where: { id: reviewId, userId },
    });

    if (!review) {
      throw new NotFoundException('Отзыв не найден или у вас нет прав');
    }

    await this.prisma.placeReview.delete({ where: { id: reviewId } });
    
    await this.updatePlaceRating(review.placeId);
    
    return { message: 'Отзыв удален' };
  }

  async searchPlaces(filters: {
    keyword?: string;
    region?: string;
    tag?: string;
    rating?: number;
  }) {
    const where: any = {};

    if (filters.keyword) {
      where.OR = [
        { title: { contains: filters.keyword, mode: 'insensitive' } },
        { description: { contains: filters.keyword, mode: 'insensitive' } },
        { shortDescription: { contains: filters.keyword, mode: 'insensitive' } },
        { address: { contains: filters.keyword, mode: 'insensitive' } },
      ];
    }

    if (filters.region) {
      where.region = { contains: filters.region, mode: 'insensitive' };
    }

    if (filters.tag) {
      where.tags = { has: filters.tag };
    }

    if (filters.rating) {
      where.rating = { gte: filters.rating };
    }

    return this.prisma.place.findMany({
      where,
      include: {
        guide: {
          include: {
            user: { select: { username: true } },
          },
        },
        reviews: true,
      },
    });
  }

  async updatePlaceRating(placeId: number) {
    const reviews = await this.prisma.placeReview.findMany({
      where: { placeId },
      select: { rating: true },
    });

    if (reviews.length === 0) {
      await this.prisma.place.update({
        where: { id: placeId },
        data: { rating: 0 },
      });
      return;
    }

    const avgRating = reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length;
    const roundedRating = Math.round(avgRating * 10) / 10;

    await this.prisma.place.update({
      where: { id: placeId },
      data: { rating: roundedRating },
    });
  }
}