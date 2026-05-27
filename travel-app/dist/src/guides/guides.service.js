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
exports.GuidesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GuidesService = class GuidesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getGuideProfile(userId) {
        const guide = await this.prisma.guide.findUnique({
            where: { userId },
        });
        if (!guide) {
            throw new common_1.NotFoundException('Гид не найден');
        }
        return guide;
    }
    async updateGuideProfile(userId, data) {
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
    async findOne(userId) {
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
            throw new common_1.NotFoundException('Гид не найден');
        }
        return guide;
    }
    async getGuideWithRoutes(userId) {
        const guide = await this.prisma.guide.findUnique({
            where: { userId },
            include: {
                user: { select: { username: true } },
                routes: true,
            },
        });
        if (!guide) {
            throw new common_1.NotFoundException('Гид не найден');
        }
        return guide;
    }
    async getAllGuidesWithRoutesCount() {
        const guides = await this.prisma.guide.findMany({
            include: {
                user: { select: { username: true } },
            },
        });
        const guidesWithCount = await Promise.all(guides.map(async (guide) => {
            const routesCount = await this.prisma.route.count({
                where: { guideUserId: guide.userId },
            });
            return { ...guide, routesCount };
        }));
        return guidesWithCount;
    }
};
exports.GuidesService = GuidesService;
exports.GuidesService = GuidesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GuidesService);
//# sourceMappingURL=guides.service.js.map