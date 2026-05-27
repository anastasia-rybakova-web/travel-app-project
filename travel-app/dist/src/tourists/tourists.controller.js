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
exports.TouristsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tourists_service_1 = require("./tourists.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let TouristsController = class TouristsController {
    constructor(touristsService) {
        this.touristsService = touristsService;
    }
    async findAll() {
        return this.touristsService.findAll();
    }
    async findOne(userId) {
        return this.touristsService.findOne(parseInt(userId, 10));
    }
    async getProfile(userId) {
        return this.touristsService.getTouristProfile(parseInt(userId, 10));
    }
    async updateProfile(userId, updateData) {
        return this.touristsService.updateTouristProfile(parseInt(userId, 10), updateData);
    }
    async getTouristBookings(userId) {
        return this.touristsService.getTouristBookings(parseInt(userId, 10));
    }
    async getTouristHistory(userId) {
        return this.touristsService.getTouristHistory(parseInt(userId, 10));
    }
    async getTouristUpcoming(userId) {
        return this.touristsService.getTouristUpcoming(parseInt(userId, 10));
    }
    async getTouristPendingBookings(userId) {
        return this.touristsService.getTouristPendingBookings(parseInt(userId, 10));
    }
};
exports.TouristsController = TouristsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('guide'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить список всех туристов (только для гидов)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список туристов' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Доступ только для гидов' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TouristsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить информацию о туристе по ID' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID туриста' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Информация о туристе' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Турист не найден' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TouristsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('profile/:userId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить профиль туриста (для редактирования)' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID туриста' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Профиль туриста' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TouristsController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile/:userId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить профиль туриста' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID туриста' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Профиль обновлен' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TouristsController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)(':userId/bookings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить все бронирования туриста' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID туриста' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список бронирований' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TouristsController.prototype, "getTouristBookings", null);
__decorate([
    (0, common_1.Get)(':userId/history'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить историю завершенных поездок туриста' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID туриста' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список завершенных поездок' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TouristsController.prototype, "getTouristHistory", null);
__decorate([
    (0, common_1.Get)(':userId/upcoming'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить предстоящие туры туриста' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID туриста' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список предстоящих туров' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TouristsController.prototype, "getTouristUpcoming", null);
__decorate([
    (0, common_1.Get)(':userId/pending'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить заявки туриста на рассмотрении' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID туриста' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список заявок на рассмотрении' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TouristsController.prototype, "getTouristPendingBookings", null);
exports.TouristsController = TouristsController = __decorate([
    (0, swagger_1.ApiTags)('tourists'),
    (0, common_1.Controller)('tourists'),
    __metadata("design:paramtypes", [tourists_service_1.TouristsService])
], TouristsController);
//# sourceMappingURL=tourists.controller.js.map