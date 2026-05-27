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
exports.BookingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bookings_service_1 = require("./bookings.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let BookingsController = class BookingsController {
    constructor(bookingsService) {
        this.bookingsService = bookingsService;
    }
    async createBooking(createBookingDto, req) {
        const bookingData = {
            ...createBookingDto,
            touristUserId: req.user.userId,
        };
        return this.bookingsService.createBooking(bookingData);
    }
    async getBookingsByGuide(guideUserId) {
        return this.bookingsService.getBookingsByGuide(parseInt(guideUserId, 10));
    }
    async getBookingsByTourist(touristUserId, req) {
        if (req.user.userId !== parseInt(touristUserId)) {
            throw new common_1.UnauthorizedException('Нет доступа к чужим бронированиям');
        }
        return this.bookingsService.getBookingsByTourist(parseInt(touristUserId));
    }
    async getBookingsByRoute(routeId, date) {
        return this.bookingsService.getBookingsByRoute(parseInt(routeId, 10), date);
    }
    async hasUserCompletedRoute(req, routeId) {
        return this.bookingsService.hasUserCompletedRoute(req.user.userId, parseInt(routeId, 10));
    }
    async updateStatus(id, status) {
        return this.bookingsService.updateBookingStatus(parseInt(id, 10), status);
    }
    async requestCancel(id, reason, requestedBy) {
        return this.bookingsService.requestCancel(parseInt(id, 10), reason, requestedBy);
    }
    async rejectCancelRequest(id) {
        return this.bookingsService.rejectCancelRequest(parseInt(id, 10));
    }
    async completeBooking(id) {
        return this.bookingsService.completeBooking(parseInt(id, 10));
    }
};
exports.BookingsController = BookingsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новое бронирование' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Бронирование создано' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    (0, swagger_1.ApiBody)({ schema: { example: { routeId: 1, guideUserId: 1, date: '2026-06-13', people: 2, fio: 'Иванов И.И.', phone: '+375291234567', email: 'ivanov@mail.ru', note: 'Особые пожелания' } } }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "createBooking", null);
__decorate([
    (0, common_1.Get)('guide/:guideUserId'),
    (0, roles_decorator_1.Roles)('guide'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Получить бронирования гида' }),
    (0, swagger_1.ApiParam)({ name: 'guideUserId', description: 'ID гида' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список бронирований' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Доступ только для гидов' }),
    __param(0, (0, common_1.Param)('guideUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getBookingsByGuide", null);
__decorate([
    (0, common_1.Get)('tourist/:touristUserId'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить бронирования туриста' }),
    (0, swagger_1.ApiParam)({ name: 'touristUserId', description: 'ID туриста' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список бронирований' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Нет доступа к чужим бронированиям' }),
    __param(0, (0, common_1.Param)('touristUserId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getBookingsByTourist", null);
__decorate([
    (0, common_1.Get)('route/:routeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить бронирования маршрута на конкретную дату' }),
    (0, swagger_1.ApiParam)({ name: 'routeId', description: 'ID маршрута' }),
    (0, swagger_1.ApiQuery)({ name: 'date', description: 'Дата в формате YYYY-MM-DD' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список бронирований' }),
    __param(0, (0, common_1.Param)('routeId')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getBookingsByRoute", null);
__decorate([
    (0, common_1.Get)('check-completed/:routeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Проверить, был ли турист на маршруте (для возможности оставить отзыв)' }),
    (0, swagger_1.ApiParam)({ name: 'routeId', description: 'ID маршрута' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'true - был, false - не был' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('routeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "hasUserCompletedRoute", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить статус бронирования' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID бронирования' }),
    (0, swagger_1.ApiBody)({ schema: { example: { status: 'confirmed' } } }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Статус обновлен' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)(':id/cancel-request'),
    (0, swagger_1.ApiOperation)({ summary: 'Запросить отмену бронирования' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID бронирования' }),
    (0, swagger_1.ApiBody)({ schema: { example: { reason: 'Изменение планов', requestedBy: 'tourist' } } }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Запрос на отмену отправлен' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __param(2, (0, common_1.Body)('requestedBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "requestCancel", null);
__decorate([
    (0, common_1.Post)(':id/reject-cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Отклонить запрос на отмену' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID бронирования' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Запрос на отмену отклонен' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "rejectCancelRequest", null);
__decorate([
    (0, common_1.Patch)(':id/complete'),
    (0, swagger_1.ApiOperation)({ summary: 'Завершить бронирование' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID бронирования' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Бронирование завершено' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "completeBooking", null);
exports.BookingsController = BookingsController = __decorate([
    (0, swagger_1.ApiTags)('bookings'),
    (0, common_1.Controller)('bookings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [bookings_service_1.BookingsService])
], BookingsController);
//# sourceMappingURL=bookings.controller.js.map