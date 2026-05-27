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
exports.RoutesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const routes_service_1 = require("./routes.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let RoutesController = class RoutesController {
    constructor(routesService) {
        this.routesService = routesService;
    }
    async findAll() {
        return this.routesService.findAll();
    }
    async getPopularRoutes(limit) {
        const limitNum = limit ? parseInt(limit, 10) : 6;
        const finalLimit = isNaN(limitNum) ? 6 : limitNum;
        return this.routesService.getPopularRoutes(finalLimit);
    }
    async getRoutesByGuide(guideUserId) {
        return this.routesService.getRoutesByGuide(parseInt(guideUserId, 10));
    }
    async searchRoutes(keyword, routeType, minPrice) {
        let minPriceNum = minPrice ? parseInt(minPrice, 10) : undefined;
        if (minPriceNum !== undefined && isNaN(minPriceNum)) {
            minPriceNum = undefined;
        }
        return this.routesService.searchRoutes(keyword, routeType, minPriceNum);
    }
    async getWithFilters(keyword, type, price, rating, startDate, endDate) {
        let priceNum = price ? parseFloat(price) : undefined;
        let ratingNum = rating ? parseFloat(rating) : undefined;
        if (priceNum !== undefined && isNaN(priceNum))
            priceNum = undefined;
        if (ratingNum !== undefined && isNaN(ratingNum))
            ratingNum = undefined;
        return this.routesService.getAllWithFilters({
            keyword,
            type,
            price: priceNum,
            rating: ratingNum,
            startDate,
            endDate,
        });
    }
    async findOne(id) {
        return this.routesService.findOne(parseInt(id, 10));
    }
    async getRouteWithAllData(id) {
        return this.routesService.getRouteWithAllData(parseInt(id, 10));
    }
    async create(createRouteDto) {
        return this.routesService.createRoute(createRouteDto);
    }
    async update(id, updateData) {
        return this.routesService.updateRoute(parseInt(id, 10), updateData);
    }
    async delete(id) {
        return this.routesService.deleteRoute(parseInt(id, 10));
    }
    async getRouteReviews(routeId) {
        return this.routesService.getRouteReviews(parseInt(routeId, 10));
    }
    async addRouteReview(routeId, req, rating, text) {
        return this.routesService.addRouteReview(parseInt(routeId, 10), req.user.userId, rating, text);
    }
    async updateRouteReview(reviewId, req, rating, text) {
        return this.routesService.updateRouteReview(parseInt(reviewId, 10), req.user.userId, rating, text);
    }
    async deleteRouteReview(reviewId, req) {
        return this.routesService.deleteRouteReview(parseInt(reviewId, 10), req.user.userId);
    }
};
exports.RoutesController = RoutesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить список всех маршрутов' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список маршрутов' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('popular'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить популярные маршруты (по рейтингу)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Количество маршрутов' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список популярных маршрутов' }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "getPopularRoutes", null);
__decorate([
    (0, common_1.Get)('guide/:guideUserId'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить маршруты гида' }),
    (0, swagger_1.ApiParam)({ name: 'guideUserId', description: 'ID гида' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список маршрутов гида' }),
    __param(0, (0, common_1.Param)('guideUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "getRoutesByGuide", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Поиск маршрутов по ключевым словам' }),
    (0, swagger_1.ApiQuery)({ name: 'keyword', required: false, description: 'Ключевое слово' }),
    (0, swagger_1.ApiQuery)({ name: 'routeType', required: false, description: 'Тип маршрута' }),
    (0, swagger_1.ApiQuery)({ name: 'minPrice', required: false, description: 'Минимальная цена' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Результаты поиска' }),
    __param(0, (0, common_1.Query)('keyword')),
    __param(1, (0, common_1.Query)('routeType')),
    __param(2, (0, common_1.Query)('minPrice')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "searchRoutes", null);
__decorate([
    (0, common_1.Get)('search/filters'),
    (0, swagger_1.ApiOperation)({ summary: 'Расширенный поиск маршрутов' }),
    (0, swagger_1.ApiQuery)({ name: 'keyword', required: false, description: 'Ключевое слово' }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, description: 'Тип маршрута' }),
    (0, swagger_1.ApiQuery)({ name: 'price', required: false, description: 'Максимальная цена' }),
    (0, swagger_1.ApiQuery)({ name: 'rating', required: false, description: 'Минимальный рейтинг' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, description: 'Дата начала' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, description: 'Дата окончания' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Результаты поиска' }),
    __param(0, (0, common_1.Query)('keyword')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('price')),
    __param(3, (0, common_1.Query)('rating')),
    __param(4, (0, common_1.Query)('startDate')),
    __param(5, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "getWithFilters", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить маршрут по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID маршрута' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Информация о маршруте' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Маршрут не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/full'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить маршрут со всеми данными (места, даты, отзывы)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID маршрута' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Полная информация о маршруте' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "getRouteWithAllData", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('guide'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новый маршрут (только для гидов)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Маршрут создан' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Доступ только для гидов' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('guide'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить маршрут (только для гидов)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID маршрута' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Маршрут обновлен' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('guide'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить маршрут (только для гидов)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID маршрута' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Маршрут удален' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':routeId/reviews'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить отзывы о маршруте' }),
    (0, swagger_1.ApiParam)({ name: 'routeId', description: 'ID маршрута' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список отзывов' }),
    __param(0, (0, common_1.Param)('routeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "getRouteReviews", null);
__decorate([
    (0, common_1.Post)(':routeId/reviews'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Добавить отзыв о маршруте' }),
    (0, swagger_1.ApiParam)({ name: 'routeId', description: 'ID маршрута' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Отзыв добавлен' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    __param(0, (0, common_1.Param)('routeId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)('rating')),
    __param(3, (0, common_1.Body)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number, String]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "addRouteReview", null);
__decorate([
    (0, common_1.Put)('reviews/:reviewId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить отзыв о маршруте' }),
    (0, swagger_1.ApiParam)({ name: 'reviewId', description: 'ID отзыва' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Отзыв обновлен' }),
    __param(0, (0, common_1.Param)('reviewId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)('rating')),
    __param(3, (0, common_1.Body)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number, String]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "updateRouteReview", null);
__decorate([
    (0, common_1.Delete)('reviews/:reviewId'),
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
], RoutesController.prototype, "deleteRouteReview", null);
exports.RoutesController = RoutesController = __decorate([
    (0, swagger_1.ApiTags)('routes'),
    (0, common_1.Controller)('routes'),
    __metadata("design:paramtypes", [routes_service_1.RoutesService])
], RoutesController);
//# sourceMappingURL=routes.controller.js.map