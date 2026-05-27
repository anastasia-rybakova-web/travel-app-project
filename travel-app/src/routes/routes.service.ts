import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoutesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.route.findMany({
      include: {
        guide: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
        routePlaces: {
          include: {
            place: true,
          },
        },
        routeDates: true,
        reviews: true,
      },
    });
  }

  async findOne(id: number) {
    const route = await this.prisma.route.findUnique({
      where: { id },
      include: {
        guide: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
        routePlaces: {
          include: {
            place: true,
          },
        },
        routeDates: true,
        reviews: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
        bookings: true,
      },
    });

    if (!route) {
      throw new NotFoundException(`Маршрут с id ${id} не найден`);
    }

    return route;
  }

  async getPopularRoutes(limit: number = 6) {
    return this.prisma.route.findMany({
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
        routePlaces: {
          include: {
            place: true,
          },
          take: 3,
        },
        routeDates: {
          where: { date: { gte: new Date() } },
          orderBy: { date: 'asc' },
          take: 1,
        },
      },
    });
  }

  async getRoutesByGuide(guideUserId: number) {
    return this.prisma.route.findMany({
      where: { guideUserId },
      include: {
        routePlaces: {
          include: {
            place: true,
          },
        },
        routeDates: true,
        reviews: true,
      },
    });
  }

  async searchRoutes(keyword?: string, routeType?: string, minPrice?: number) {
    const where: any = {};
    
    if (keyword) {
      where.OR = [
        { title: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } },
        { shortDescription: { contains: keyword, mode: 'insensitive' } },
      ];
    }
    
    if (routeType) {
      where.type = { contains: routeType, mode: 'insensitive' };
    }
    
    if (minPrice && minPrice > 0) {
      where.price = { gte: minPrice.toString() };
    }
    
    return this.prisma.route.findMany({
      where,
      include: {
        guide: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
        routePlaces: {
          include: {
            place: true,
          },
        },
        routeDates: true,
      },
    });
  }

  async createRoute(data: any) {
    const { places, dates, ...routeData } = data;
    
    return this.prisma.route.create({
      data: {
        title: routeData.title,
        shortDescription: routeData.shortDescription,
        description: routeData.description,
        duration: routeData.duration,
        people: routeData.people,
        price: routeData.price,
        type: routeData.type,
        photos: routeData.photos || [],
        rating: routeData.rating || 0,
        guideUserId: routeData.guideUserId,
        routePlaces: places && places.length ? {
          create: places.map((placeId: number) => ({ placeId })),
        } : undefined,
        routeDates: dates && dates.length ? {
          create: dates.map((date: string) => ({ date: new Date(date) })),
        } : undefined,
      },
      include: {
        guide: true,
        routePlaces: {
          include: {
            place: true,
          },
        },
        routeDates: true,
      },
    });
  }

  async updateRoute(id: number, data: any) {
    await this.findOne(id);
    
    const { places, dates, ...routeData } = data;
    
    await this.prisma.route.update({
      where: { id },
      data: {
        title: routeData.title,
        shortDescription: routeData.shortDescription,
        description: routeData.description,
        duration: routeData.duration,
        people: routeData.people,
        price: routeData.price,
        type: routeData.type,
        photos: routeData.photos,
        rating: routeData.rating,
      },
    });
    
    if (places !== undefined) {
      await this.prisma.routePlace.deleteMany({ where: { routeId: id } });
      if (places.length) {
        await this.prisma.routePlace.createMany({
          data: places.map((placeId: number) => ({ routeId: id, placeId })),
        });
      }
    }
    
    if (dates !== undefined) {
      await this.prisma.routeDate.deleteMany({ where: { routeId: id } });
      if (dates.length) {
        await this.prisma.routeDate.createMany({
          data: dates.map((date: string) => ({ routeId: id, date: new Date(date) })),
        });
      }
    }
    
    return this.findOne(id);
  }

  async deleteRoute(id: number) {
    await this.findOne(id);
    return this.prisma.route.delete({ where: { id } });
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

  async addRouteReview(routeId: number, userId: number, rating: number, text: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { username: true },
    });

    const newReview = await this.prisma.routeReview.create({
      data: {
        routeId,
        userId,
        username: user?.username,
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

  async getRouteWithAllData(id: number) {
    const route = await this.prisma.route.findUnique({
      where: { id },
      include: {
        guide: {
          include: {
            user: { select: { username: true } }
          }
        },
        routePlaces: {
          include: {
            place: true
          }
        },
        routeDates: {
          orderBy: { date: 'asc' }
        },
        reviews: {
          include: {
            user: { select: { username: true } }
          },
          orderBy: { createdAt: 'desc' }
        },
      },
    });
    
    if (!route) {
      throw new NotFoundException(`Маршрут с id ${id} не найден`);
    }
    
    return {
      id: route.id,
      title: route.title,
      shortDescription: route.shortDescription,
      description: route.description,
      duration: route.duration,
      people: route.people,
      price: route.price,
      type: route.type,
      photos: route.photos,
      rating: route.rating,
      guideUserId: route.guideUserId,
      guide: route.guide,
      places: route.routePlaces?.map(rp => rp.place) || [],
      dates: route.routeDates?.map(rd => rd.date.toISOString().split('T')[0]) || [],
      reviews: route.reviews,
    };
  }

  async getAllWithFilters(filters: {
    keyword?: string;
    type?: string;
    price?: number;
    rating?: number;
    startDate?: string;
    endDate?: string;
  }) {
    const where: any = {};
    
    if (filters.keyword) {
      where.OR = [
        { title: { contains: filters.keyword, mode: 'insensitive' } },
        { description: { contains: filters.keyword, mode: 'insensitive' } },
        { shortDescription: { contains: filters.keyword, mode: 'insensitive' } },
      ];
    }
    
    if (filters.type) {
      where.type = { contains: filters.type, mode: 'insensitive' };
    }
    
    if (filters.price) {
      where.price = { lte: filters.price.toString() };
    }
    
    if (filters.rating) {
      where.rating = { gte: filters.rating };
    }
    
    const routes = await this.prisma.route.findMany({
      where,
      include: {
        guide: {
          include: {
            user: { select: { username: true } }
          }
        },
        routePlaces: {
          include: { place: true }
        },
        routeDates: true,
        reviews: true,
      },
    });
    
    let filteredRoutes = routes;
    
    if (filters.startDate || filters.endDate) {
      const start = filters.startDate ? new Date(filters.startDate) : null;
      const end = filters.endDate ? new Date(filters.endDate) : null;
      
      filteredRoutes = routes.filter(route => {
        if (!route.routeDates || route.routeDates.length === 0) return false;
        
        return route.routeDates.some(rd => {
          const date = new Date(rd.date);
          if (start && end) return date >= start && date <= end;
          if (start) return date >= start;
          if (end) return date <= end;
          return true;
        });
      });
    }
    
    return filteredRoutes;
  }
}