import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

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

  async addPlaceReview(placeId: number, userId: number, rating: number, text: string, photo?: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { username: true },
    });

    const newReview = await this.prisma.placeReview.create({
      data: {
        placeId,
        userId,
        username: user?.username,
        photo: photo || null,
        rating,
        text,
      },
    });

    await this.updatePlaceRating(placeId);
    return newReview;
  }

  async updatePlaceReview(reviewId: number, userId: number, rating: number, text: string) {
    const review = await this.prisma.placeReview.findFirst({
      where: { id: reviewId, userId },
    });

    if (!review) {
      throw new NotFoundException('Отзыв не найден или у вас нет прав');
    }

    const updatedReview = await this.prisma.placeReview.update({
      where: { id: reviewId },
      data: { rating, text },
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

  async getRouteReviews(routeId: number) {
    return this.prisma.routeReview.findMany({
      where: { routeId },
      include: {
        user: {
          select: { username: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }


  async addRouteReview(routeId: number, userId: number, rating: number, text: string, photo?: string) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
    select: { username: true },
  });

  let userPhoto = photo;
  if (!userPhoto) {
    const tourist = await this.prisma.tourist.findUnique({
      where: { userId },
      select: { photo: true },
    });
    userPhoto = tourist?.photo || null;
  }

  const newReview = await this.prisma.routeReview.create({
    data: {
      routeId,
      userId,
      username: user?.username,
      photo: userPhoto,
      rating,
      text,
    },
  });

  await this.updateRouteRating(routeId);
  return newReview;
}

  async updateRouteReview(reviewId: number, userId: number, rating: number, text: string) {
    const review = await this.prisma.routeReview.findFirst({
      where: { id: reviewId, userId },
    });

    if (!review) {
      throw new NotFoundException('Отзыв не найден или у вас нет прав');
    }

    const updatedReview = await this.prisma.routeReview.update({
      where: { id: reviewId },
      data: { rating, text },
    });

    await this.updateRouteRating(review.routeId);
    return updatedReview;
  }

  async deleteRouteReview(reviewId: number, userId: number) {
    const review = await this.prisma.routeReview.findFirst({
      where: { id: reviewId, userId },
    });

    if (!review) {
      throw new NotFoundException('Отзыв не найден или у вас нет прав');
    }

    await this.prisma.routeReview.delete({ where: { id: reviewId } });
    await this.updateRouteRating(review.routeId);
    return { message: 'Отзыв удален' };
  }

  async updateRouteRating(routeId: number) {
    const reviews = await this.prisma.routeReview.findMany({
      where: { routeId },
      select: { rating: true },
    });

    if (reviews.length === 0) {
      await this.prisma.route.update({
        where: { id: routeId },
        data: { rating: 0 },
      });
      return;
    }

    const avgRating = reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length;
    const roundedRating = Math.round(avgRating * 10) / 10;

    await this.prisma.route.update({
      where: { id: routeId },
      data: { rating: roundedRating },
    });
  }

  async getGuideReviews(guideUserId: number) {
    return this.prisma.guideReview.findMany({
      where: { guideUserId },
      include: {
        user: {
          select: { username: true },
        },
        guide: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addGuideReview(guideUserId: number, userId: number, rating: number, text: string, photo?: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { username: true },
    });

    let userPhoto = photo;
    if (!userPhoto) {
      const tourist = await this.prisma.tourist.findUnique({
        where: { userId },
        select: { photo: true },
      });
      userPhoto = tourist?.photo || null;
    }

    const newReview = await this.prisma.guideReview.create({
      data: {
        guideUserId,
        userId,
        username: user?.username,
        photo: userPhoto,
        rating,
        text,
      },
    });

    await this.updateGuideRating(guideUserId);

    return newReview;
  }

  async updateGuideReview(reviewId: number, userId: number, rating: number, text: string) {
    const review = await this.prisma.guideReview.findFirst({
      where: { id: reviewId, userId },
    });

    if (!review) {
      throw new NotFoundException('Отзыв не найден или у вас нет прав');
    }

    const updatedReview = await this.prisma.guideReview.update({
      where: { id: reviewId },
      data: { rating, text },
    });

    await this.updateGuideRating(review.guideUserId);
    return updatedReview;
  }

  async deleteGuideReview(reviewId: number, userId: number) {
    const review = await this.prisma.guideReview.findFirst({
      where: { id: reviewId, userId },
    });

    if (!review) {
      throw new NotFoundException('Отзыв не найден или у вас нет прав');
    }

    await this.prisma.guideReview.delete({ where: { id: reviewId } });
    await this.updateGuideRating(review.guideUserId);
    return { message: 'Отзыв удален' };
  }

  async updateGuideRating(guideUserId: number) {
    const reviews = await this.prisma.guideReview.findMany({
      where: { guideUserId },
      select: { rating: true },
    });

    if (reviews.length === 0) {
      await this.prisma.guide.update({
        where: { userId: guideUserId },
        data: { rating: 0 },
      });
      return;
    }

    const avgRating = reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length;
    const roundedRating = Math.round(avgRating * 10) / 10;

    await this.prisma.guide.update({
      where: { userId: guideUserId },
      data: { rating: roundedRating },
    });
  }
}