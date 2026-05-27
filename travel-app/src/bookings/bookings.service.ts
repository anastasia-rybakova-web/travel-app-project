import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async getBookingsByGuide(guideUserId: number) {
    return this.prisma.booking.findMany({
      where: { guideUserId },
      include: {
        cancelRequest: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }


async createBooking(data: any) {
  return this.prisma.booking.create({
    data: {
      routeId: data.routeId,
      guideUserId: data.guideUserId,
      touristUserId: data.touristUserId,
      date: new Date(data.date),
      people: data.people,
      fio: data.fio,
      phone: data.phone,
      email: data.email,
      note: data.note || null,
      status: 'pending',
    },
  });
}

  async updateBookingStatus(id: number, status: string) {
    const updateData: any = { status };
    
    if (status === 'confirmed') {
      updateData.confirmedAt = new Date();
    } else if (status === 'done') {
      updateData.completedAt = new Date();
    } else if (status === 'cancelled' || status === 'rejected') {
      updateData.cancelledAt = new Date();
    }
    
    return this.prisma.booking.update({
      where: { id },
      data: updateData,
    });
  }

  async requestCancel(bookingId: number, reason: string, requestedBy: string) {
    return this.prisma.$transaction(async (prisma) => {

      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'cancel_requested' },
      });

      return prisma.cancelRequest.create({
        data: {
          bookingId,
          date: new Date(),
          reason,
          requestedBy: requestedBy as any,
          isRejection: reason?.includes('отклонен') || false,
        },
      });
    });
  }

  async rejectCancelRequest(bookingId: number) {
    await this.prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'confirmed' },
    });
    
    return this.prisma.cancelRequest.deleteMany({
      where: { bookingId },
    });
  }

  async completeBooking(id: number) {
    return this.prisma.booking.update({
      where: { id },
      data: {
        status: 'done',
        completedAt: new Date(),
      },
    });
  }

async hasUserCompletedRoute(touristUserId: number, routeId: number): Promise<boolean> {
  const booking = await this.prisma.booking.findFirst({
    where: {
      touristUserId,
      routeId,
      status: 'done',
    },
  });
  return !!booking;
}


async getBookingsByRoute(routeId: number, date: string) {
  return this.prisma.booking.findMany({
    where: {
      routeId,
      date: new Date(date),
      status: 'confirmed',
    },
  });
}

async getBookingsByTourist(touristUserId: number) {
  return this.prisma.booking.findMany({
    where: { touristUserId },
    include: {
      cancelRequest: true,
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