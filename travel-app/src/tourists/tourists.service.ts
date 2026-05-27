import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TouristsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tourist.findMany({
      include: {
        user: {
          select: { username: true },
        },
        bookings: true,
      },
    });
  }

  async findOne(userId: number) {
    const tourist = await this.prisma.tourist.findUnique({
      where: { userId },
      include: {
        user: {
          select: { username: true },
        },
        bookings: {
          include: {
            route: true,
            guide: {
              include: {
                user: {
                  select: { username: true },
                },
              },
            },
            cancelRequest: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!tourist) {
      throw new NotFoundException(`Турист с id ${userId} не найден`);
    }

    return tourist;
  }

  async getTouristProfile(userId: number) {
    const tourist = await this.prisma.tourist.findUnique({
      where: { userId },
      include: {
        user: {
          select: { username: true },
        },
      },
    });

    if (!tourist) {
      throw new NotFoundException('Турист не найден');
    }

    return tourist;
  }

    async updateTouristProfile(userId: number, data: any) {
    await this.getTouristProfile(userId);
    
    return this.prisma.tourist.update({
      where: { userId },
      data: {
        name: data.name,
        photo: data.photo,
        email: data.email, 
      },
    });
  }


  async getTouristBookings(userId: number) {
    return this.prisma.booking.findMany({
      where: { touristUserId: userId },
      include: {
        route: true,
        guide: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
        cancelRequest: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTouristHistory(userId: number) {
    return this.prisma.booking.findMany({
      where: {
        touristUserId: userId,
        status: 'done',
      },
      include: {
        route: true,
        guide: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
      },
      orderBy: { date: 'desc' },
    });
  }

  async getTouristUpcoming(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.prisma.booking.findMany({
      where: {
        touristUserId: userId,
        status: 'confirmed',
        date: { gte: today },
      },
      include: {
        route: true,
        guide: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
      },
      orderBy: { date: 'asc' },
    });
  }

  async getTouristPendingBookings(userId: number) {
    return this.prisma.booking.findMany({
      where: {
        touristUserId: userId,
        status: 'pending',
      },
      include: {
        route: true,
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
}