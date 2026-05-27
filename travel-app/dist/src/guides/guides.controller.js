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
exports.GuidesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guides_service_1 = require("./guides.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let GuidesController = class GuidesController {
    constructor(guidesService) {
        this.guidesService = guidesService;
    }
    async findAll() {
        return this.guidesService.getAllGuidesWithRoutesCount();
    }
    async findOne(userId) {
        return this.guidesService.findOne(parseInt(userId, 10));
    }
    async getProfile(userId) {
        return this.guidesService.getGuideProfile(parseInt(userId, 10));
    }
    async updateProfile(userId, updateData) {
        return this.guidesService.updateGuideProfile(parseInt(userId, 10), updateData);
    }
};
exports.GuidesController = GuidesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить список всех гидов с количеством маршрутов' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список гидов' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GuidesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить информацию о гиде по ID' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID гида' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Информация о гиде' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Гид не найден' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GuidesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('profile/:userId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить профиль гида (для редактирования)' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID гида' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Профиль гида' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GuidesController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile/:userId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить профиль гида' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID гида' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Профиль обновлен' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GuidesController.prototype, "updateProfile", null);
exports.GuidesController = GuidesController = __decorate([
    (0, swagger_1.ApiTags)('guides'),
    (0, common_1.Controller)('guides'),
    __metadata("design:paramtypes", [guides_service_1.GuidesService])
], GuidesController);
//# sourceMappingURL=guides.controller.js.map