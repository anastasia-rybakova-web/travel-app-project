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
exports.TouristsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TouristsService = class TouristsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async findOne(userId) {
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
            throw new common_1.NotFoundException(`Турист с id ${userId} не найден`);
        }
        return tourist;
    }
    async getTouristProfile(userId) {
        const tourist = await this.prisma.tourist.findUnique({
            where: { userId },
            include: {
                user: {
                    select: { username: true },
                },
            },
        });
        if (!tourist) {
            throw new common_1.NotFoundException('Турист не найден');
        }
        return tourist;
    }
    async updateTouristProfile(userId, data) {
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
    async getTouristBookings(userId) {
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
    async getTouristHistory(userId) {
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
    async getTouristUpcoming(userId) {
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
    async getTouristPendingBookings(userId) {
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
};
exports.TouristsService = TouristsService;
exports.TouristsService = TouristsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TouristsService);
//# sourceMappingURL=tourists.service.js.map