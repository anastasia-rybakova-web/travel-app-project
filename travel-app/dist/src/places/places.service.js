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
exports.PlacesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PlacesService = class PlacesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Место с id ${id} не найдено`);
        }
        return place;
    }
    async getBestPlaces(limit = 8) {
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
    async getPlacesByRegion(region) {
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
    async getPlacesByGuide(guideUserId) {
        return this.prisma.place.findMany({
            where: { guideUserId },
            include: {
                reviews: true,
            },
        });
    }
    async createPlace(data) {
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
    async updatePlace(id, data) {
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
    async deletePlace(id) {
        await this.findOne(id);
        return this.prisma.place.delete({ where: { id } });
    }
    async getPlaceReviews(placeId) {
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
    async addPlaceReview(placeId, reviewData, userId) {
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
    async updatePlaceReview(reviewId, reviewData, userId) {
        const review = await this.prisma.placeReview.findFirst({
            where: { id: reviewId, userId },
        });
        if (!review) {
            throw new common_1.NotFoundException('Отзыв не найден или у вас нет прав');
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
    async deletePlaceReview(reviewId, userId) {
        const review = await this.prisma.placeReview.findFirst({
            where: { id: reviewId, userId },
        });
        if (!review) {
            throw new common_1.NotFoundException('Отзыв не найден или у вас нет прав');
        }
        await this.prisma.placeReview.delete({ where: { id: reviewId } });
        await this.updatePlaceRating(review.placeId);
        return { message: 'Отзыв удален' };
    }
    async searchPlaces(filters) {
        const where = {};
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
    async updatePlaceRating(placeId) {
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
};
exports.PlacesService = PlacesService;
exports.PlacesService = PlacesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlacesService);
//# sourceMappingURL=places.service.js.map