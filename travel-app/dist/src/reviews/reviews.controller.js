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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reviews_service_1 = require("./reviews.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    async getPlaceReviews(placeId) {
        return this.reviewsService.getPlaceReviews(parseInt(placeId));
    }
    async addPlaceReview(placeId, req, body) {
        return this.reviewsService.addPlaceReview(parseInt(placeId), req.user.userId, body.rating, body.text, body.photo);
    }
    async updatePlaceReview(reviewId, req, body) {
        return this.reviewsService.updatePlaceReview(parseInt(reviewId), req.user.userId, body.rating, body.text);
    }
    async deletePlaceReview(reviewId, req) {
        return this.reviewsService.deletePlaceReview(parseInt(reviewId), req.user.userId);
    }
    async getRouteReviews(routeId) {
        return this.reviewsService.getRouteReviews(parseInt(routeId));
    }
    async addRouteReview(routeId, req, body) {
        return this.reviewsService.addRouteReview(parseInt(routeId), req.user.userId, body.rating, body.text, body.photo);
    }
    async updateRouteReview(reviewId, req, body) {
        return this.reviewsService.updateRouteReview(parseInt(reviewId), req.user.userId, body.rating, body.text);
    }
    async deleteRouteReview(reviewId, req) {
        return this.reviewsService.deleteRouteReview(parseInt(reviewId), req.user.userId);
    }
    async getGuideReviews(guideUserId) {
        return this.reviewsService.getGuideReviews(parseInt(guideUserId));
    }
    async addGuideReview(guideUserId, req, body) {
        return this.reviewsService.addGuideReview(parseInt(guideUserId), req.user.userId, body.rating, body.text, body.photo);
    }
    async updateGuideReview(reviewId, req, body) {
        return this.reviewsService.updateGuideReview(parseInt(reviewId), req.user.userId, body.rating, body.text);
    }
    async deleteGuideReview(reviewId, req) {
        return this.reviewsService.deleteGuideReview(parseInt(reviewId), req.user.userId);
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, common_1.Get)('places/:placeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить отзывы о месте' }),
    (0, swagger_1.ApiParam)({ name: 'placeId', description: 'ID места' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список отзывов' }),
    __param(0, (0, common_1.Param)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getPlaceReviews", null);
__decorate([
    (0, common_1.Post)('places/:placeId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Добавить отзыв о месте' }),
    (0, swagger_1.ApiParam)({ name: 'placeId', description: 'ID места' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Отзыв добавлен' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    __param(0, (0, common_1.Param)('placeId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "addPlaceReview", null);
__decorate([
    (0, common_1.Put)('places/:reviewId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить отзыв о месте' }),
    (0, swagger_1.ApiParam)({ name: 'reviewId', description: 'ID отзыва' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Отзыв обновлен' }),
    __param(0, (0, common_1.Param)('reviewId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "updatePlaceReview", null);
__decorate([
    (0, common_1.Delete)('places/:reviewId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить отзыв о месте' }),
    (0, swagger_1.ApiParam)({ name: 'reviewId', description: 'ID отзыва' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Отзыв удален' }),
    __param(0, (0, common_1.Param)('reviewId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "deletePlaceReview", null);
__decorate([
    (0, common_1.Get)('routes/:routeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить отзывы о маршруте' }),
    (0, swagger_1.ApiParam)({ name: 'routeId', description: 'ID маршрута' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список отзывов' }),
    __param(0, (0, common_1.Param)('routeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getRouteReviews", null);
__decorate([
    (0, common_1.Post)('routes/:routeId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Добавить отзыв о маршруте' }),
    (0, swagger_1.ApiParam)({ name: 'routeId', description: 'ID маршрута' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Отзыв добавлен' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    __param(0, (0, common_1.Param)('routeId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "addRouteReview", null);
__decorate([
    (0, common_1.Put)('routes/:reviewId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить отзыв о маршруте' }),
    (0, swagger_1.ApiParam)({ name: 'reviewId', description: 'ID отзыва' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Отзыв обновлен' }),
    __param(0, (0, common_1.Param)('reviewId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "updateRouteReview", null);
__decorate([
    (0, common_1.Delete)('routes/:reviewId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить отзыв о маршруте' }),
    (0, swagger_1.ApiParam)({ name: 'reviewId', description: 'ID отзыва' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Отзыв удален' }),
    __param(0, (0, common_1.Param)('reviewId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "deleteRouteReview", null);
__decorate([
    (0, common_1.Get)('guides/:guideUserId'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить отзывы о гиде' }),
    (0, swagger_1.ApiParam)({ name: 'guideUserId', description: 'ID гида' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список отзывов' }),
    __param(0, (0, common_1.Param)('guideUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getGuideReviews", null);
__decorate([
    (0, common_1.Post)('guides/:guideUserId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Добавить отзыв о гиде' }),
    (0, swagger_1.ApiParam)({ name: 'guideUserId', description: 'ID гида' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Отзыв добавлен' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    __param(0, (0, common_1.Param)('guideUserId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "addGuideReview", null);
__decorate([
    (0, common_1.Put)('guides/:reviewId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить отзыв о гиде' }),
    (0, swagger_1.ApiParam)({ name: 'reviewId', description: 'ID отзыва' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Отзыв обновлен' }),
    __param(0, (0, common_1.Param)('reviewId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "updateGuideReview", null);
__decorate([
    (0, common_1.Delete)('guides/:reviewId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить отзыв о гиде' }),
    (0, swagger_1.ApiParam)({ name: 'reviewId', description: 'ID отзыва' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Отзыв удален' }),
    __param(0, (0, common_1.Param)('reviewId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "deleteGuideReview", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, swagger_1.ApiTags)('reviews'),
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map