"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BookingsService = class BookingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBookingsByGuide(guideUserId) {
        return this.prisma.booking.findMany({
            where: { guideUserId },
            include: {
                cancelRequest: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createBooking(data) {
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
    async updateBookingStatus(id, status) {
        const updateData = { status };
        if (status === 'confirmed') {
            updateData.confirmedAt = new Date();
        }
        else if (status === 'done') {
            updateData.completedAt = new Date();
        }
        else if (status === 'cancelled' || status === 'rejected') {
            updateData.cancelledAt = new Date();
        }
        return this.prisma.booking.update({
            where: { id },
            data: updateData,
        });
    }
    async requestCancel(bookingId, reason, requestedBy) {
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
                    requestedBy: requestedBy,
                    isRejection: reason?.includes('отклонен') || false,
                },
            });
        });
    }
    async rejectCancelRequest(bookingId) {
        await this.prisma.booking.update({
            where: { id: bookingId },
            data: { status: 'confirmed' },
        });
        return this.prisma.cancelRequest.deleteMany({
            where: { bookingId },
        });
    }
    async completeBooking(id) {
        return this.prisma.booking.update({
            where: { id },
            data: {
                status: 'done',
                completedAt: new Date(),
            },
        });
    }
    async hasUserCompletedRoute(touristUserId, routeId) {
        const booking = await this.prisma.booking.findFirst({
            where: {
                touristUserId,
                routeId,
                status: 'done',
            },
        });
        return !!booking;
    }
    async getBookingsByRoute(routeId, date) {
        return this.prisma.booking.findMany({
            where: {
                routeId,
                date: new Date(date),
                status: 'confirmed',
            },
        });
    }
    async getBookingsByTourist(touristUserId) {
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
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map