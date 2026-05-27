import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GuidesService {
  constructor(private prisma: PrismaService) {}

  async getGuideProfile(userId: number) {
    const guide = await this.prisma.guide.findUnique({
      where: { userId },
    });

    if (!guide) {
      throw new NotFoundException('Гид не найден');
    }

    return guide;
  }

  async updateGuideProfile(userId: number, data: any) {
    return this.prisma.guide.update({
      where: { userId },
      data: {
        name: data.name,
        about: data.about,
        phone: data.phone,
        email: data.email,
        photo: data.photo,
      },
    });
  }

  async findAll() {
    return this.prisma.guide.findMany({
      include: {
        user: {
          select: { username: true },
        },
      },
    });
  }

  
  async findOne(userId: number) {
  const guide = await this.prisma.guide.findUnique({
    where: { userId },
    include: {
      user: {
        select: { username: true },
      },
      places: true,
      routes: {
        include: {
          routeDates: true,
          routePlaces: {
            include: {
              place: true,
            },
          },
        },
      },
      reviews: true, 
    },
  });

  if (!guide) {
    throw new NotFoundException('Гид не найден');
  }

  return guide;
}

async getGuideWithRoutes(userId: number) {
  const guide = await this.prisma.guide.findUnique({
    where: { userId },
    include: {
      user: { select: { username: true } },
      routes: true,
    },
  });
  
  if (!guide) {
    throw new NotFoundException('Гид не найден');
  }
  
  return guide;
}

async getAllGuidesWithRoutesCount() {
  const guides = await this.prisma.guide.findMany({
    include: {
      user: { select: { username: true } },
    },
  });
  
  const guidesWithCount = await Promise.all(
    guides.map(async (guide) => {
      const routesCount = await this.prisma.route.count({
        where: { guideUserId: guide.userId },
      });
      return { ...guide, routesCount };
    })
  );
  
  return guidesWithCount;
}
}