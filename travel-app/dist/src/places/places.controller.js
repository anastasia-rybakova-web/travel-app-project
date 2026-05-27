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
exports.PlacesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const places_service_1 = require("./places.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let PlacesController = class PlacesController {
    constructor(placesService) {
        this.placesService = placesService;
    }
    async findAll() {
        return this.placesService.findAll();
    }
    async getBestPlaces(limit) {
        const limitNum = limit ? parseInt(limit, 10) : 8;
        const finalLimit = isNaN(limitNum) ? 8 : limitNum;
        return this.placesService.getBestPlaces(limitNum);
    }
    async getPlacesByRegion(region) {
        return this.placesService.getPlacesByRegion(region);
    }
    async getPlacesByGuide(guideUserId) {
        return this.placesService.getPlacesByGuide(parseInt(guideUserId, 10));
    }
    async searchPlaces(keyword, region, tag, rating) {
        const ratingNum = rating ? parseFloat(rating) : undefined;
        const finalRating = (ratingNum !== undefined && isNaN(ratingNum)) ? undefined : ratingNum;
        return this.placesService.searchPlaces({ keyword, region, tag, rating: finalRating });
    }
    async findOne(id) {
        return this.placesService.findOne(parseInt(id, 10));
    }
    async create(createPlaceDto) {
        return this.placesService.createPlace(createPlaceDto);
    }
    async update(id, updateData) {
        return this.placesService.updatePlace(parseInt(id, 10), updateData);
    }
    async delete(id) {
        return this.placesService.deletePlace(parseInt(id, 10));
    }
    async getPlaceReviews(id) {
        return this.placesService.getPlaceReviews(parseInt(id, 10));
    }
    async addPlaceReview(id, reviewData, req) {
        return this.placesService.addPlaceReview(parseInt(id, 10), reviewData, req.user.userId);
    }
    async updatePlaceReview(reviewId, reviewData, req) {
        return this.placesService.updatePlaceReview(parseInt(reviewId, 10), reviewData, req.user.userId);
    }
    async deletePlaceReview(reviewId, req) {
        return this.placesService.deletePlaceReview(parseInt(reviewId, 10), req.user.userId);
    }
};
exports.PlacesController = PlacesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить список всех мест' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список мест' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('best'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить лучшие места (по рейтингу)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Количество мест' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список лучших мест' }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "getBestPlaces", null);
__decorate([
    (0, common_1.Get)('region/:region'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить места по области' }),
    (0, swagger_1.ApiParam)({ name: 'region', description: 'Название области' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список мест в области' }),
    __param(0, (0, common_1.Param)('region')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "getPlacesByRegion", null);
__decorate([
    (0, common_1.Get)('guide/:guideUserId'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить места, созданные гидом' }),
    (0, swagger_1.ApiParam)({ name: 'guideUserId', description: 'ID гида' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список мест' }),
    __param(0, (0, common_1.Param)('guideUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "getPlacesByGuide", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Поиск мест по параметрам' }),
    (0, swagger_1.ApiQuery)({ name: 'keyword', required: false, description: 'Ключевое слово' }),
    (0, swagger_1.ApiQuery)({ name: 'region', required: false, description: 'Область' }),
    (0, swagger_1.ApiQuery)({ name: 'tag', required: false, description: 'Тег' }),
    (0, swagger_1.ApiQuery)({ name: 'rating', required: false, description: 'Минимальный рейтинг' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Результаты поиска' }),
    __param(0, (0, common_1.Query)('keyword')),
    __param(1, (0, common_1.Query)('region')),
    __param(2, (0, common_1.Query)('tag')),
    __param(3, (0, common_1.Query)('rating')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "searchPlaces", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить место по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID места' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Информация о месте' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Место не найдено' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('guide'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новое место (только для гидов)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Место создано' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Доступ только для гидов' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('guide'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить место (только для гидов)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID места' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Место обновлено' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('guide'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить место (только для гидов)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID места' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Место удалено' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id/reviews'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить отзывы о месте' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID места' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список отзывов' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "getPlaceReviews", null);
__decorate([
    (0, common_1.Post)(':id/reviews'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Добавить отзыв о месте' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID места' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Отзыв добавлен' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "addPlaceReview", null);
__decorate([
    (0, common_1.Put)('reviews/:reviewId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить отзыв о месте' }),
    (0, swagger_1.ApiParam)({ name: 'reviewId', description: 'ID отзыва' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Отзыв обновлен' }),
    __param(0, (0, common_1.Param)('reviewId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "updatePlaceReview", null);
__decorate([
    (0, common_1.Delete)('reviews/:reviewId'),
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
], PlacesController.prototype, "deletePlaceReview", null);
exports.PlacesController = PlacesController = __decorate([
    (0, swagger_1.ApiTags)('places'),
    (0, common_1.Controller)('places'),
    __metadata("design:paramtypes", [places_service_1.PlacesService])
], PlacesController);
//# sourceMappingURL=places.controller.js.map