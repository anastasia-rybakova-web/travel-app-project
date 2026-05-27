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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReviewsService = class ReviewsService {
    constructor(prisma) {
        this.prisma = prisma;
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
    async addPlaceReview(placeId, userId, rating, text, photo) {
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
    async updatePlaceReview(reviewId, userId, rating, text) {
        const review = await this.prisma.placeReview.findFirst({
            where: { id: reviewId, userId },
        });
        if (!review) {
            throw new common_1.NotFoundException('Отзыв не найден или у вас нет прав');
        }
        const updatedReview = await this.prisma.placeReview.update({
            where: { id: reviewId },
            data: { rating, text },
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
    async getRouteReviews(routeId) {
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
    async addRouteReview(routeId, userId, rating, text, photo) {
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
    async updateRouteReview(reviewId, userId, rating, text) {
        const review = await this.prisma.routeReview.findFirst({
            where: { id: reviewId, userId },
        });
        if (!review) {
            throw new common_1.NotFoundException('Отзыв не найден или у вас нет прав');
        }
        const updatedReview = await this.prisma.routeReview.update({
            where: { id: reviewId },
            data: { rating, text },
        });
        await this.updateRouteRating(review.routeId);
        return updatedReview;
    }
    async deleteRouteReview(reviewId, userId) {
        const review = await this.prisma.routeReview.findFirst({
            where: { id: reviewId, userId },
        });
        if (!review) {
            throw new common_1.NotFoundException('Отзыв не найден или у вас нет прав');
        }
        await this.prisma.routeReview.delete({ where: { id: reviewId } });
        await this.updateRouteRating(review.routeId);
        return { message: 'Отзыв удален' };
    }
    async updateRouteRating(routeId) {
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
    async getGuideReviews(guideUserId) {
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
    async addGuideReview(guideUserId, userId, rating, text, photo) {
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
    async updateGuideReview(reviewId, userId, rating, text) {
        const review = await this.prisma.guideReview.findFirst({
            where: { id: reviewId, userId },
        });
        if (!review) {
            throw new common_1.NotFoundException('Отзыв не найден или у вас нет прав');
        }
        const updatedReview = await this.prisma.guideReview.update({
            where: { id: reviewId },
            data: { rating, text },
        });
        await this.updateGuideRating(review.guideUserId);
        return updatedReview;
    }
    async deleteGuideReview(reviewId, userId) {
        const review = await this.prisma.guideReview.findFirst({
            where: { id: reviewId, userId },
        });
        if (!review) {
            throw new common_1.NotFoundException('Отзыв не найден или у вас нет прав');
        }
        await this.prisma.guideReview.delete({ where: { id: reviewId } });
        await this.updateGuideRating(review.guideUserId);
        return { message: 'Отзыв удален' };
    }
    async updateGuideRating(guideUserId) {
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
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map