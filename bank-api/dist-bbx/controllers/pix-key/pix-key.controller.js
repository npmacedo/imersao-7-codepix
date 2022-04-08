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
exports.PixKeyController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pix_key_exists_dto_1 = require("../../dto/pix-key-exists.dto");
const pix_key_dto_1 = require("../../dto/pix-key.dto");
const BankAccount_model_1 = require("../../models/BankAccount.model");
const pix_key_model_1 = require("../../models/pix-key.model");
const typeorm_2 = require("typeorm");
let PixKeyController = class PixKeyController {
    constructor(pixKeyRepo, bankAccountRepo, client) {
        this.pixKeyRepo = pixKeyRepo;
        this.bankAccountRepo = bankAccountRepo;
        this.client = client;
    }
    index(bankAccountId) {
        return this.pixKeyRepo.find({
            where: {
                bank_account_id: bankAccountId
            },
            order: {
                created_at: 'DESC'
            }
        });
    }
    async store(bankAccountId, body) {
        await this.bankAccountRepo.findOneOrFail({ where: { id: bankAccountId } });
        const pixService = this.client.getService('PixService');
        const notFound = await this.checkPixKeyNotFound(body);
        if (!notFound) {
            throw new common_1.UnprocessableEntityException("PixKey already exists");
        }
        const createdPixKey = await pixService.registerPixKey(Object.assign(Object.assign({}, body), { accountId: bankAccountId })).toPromise();
        if (createdPixKey.error) {
            throw new common_1.InternalServerErrorException(createdPixKey.error);
        }
        const pixKey = this.pixKeyRepo.create(Object.assign({ id: createdPixKey.id, bank_account_id: bankAccountId }, body));
        return await this.pixKeyRepo.save(pixKey);
    }
    async checkPixKeyNotFound(params) {
        const pixService = this.client.getService('PixService');
        try {
            await pixService.find(params).toPromise();
            return false;
        }
        catch (error) {
            if (error.details === "no key was found") {
                return true;
            }
            throw new common_1.InternalServerErrorException("Server not available");
        }
    }
    async exists(params) {
        const pixService = this.client.getService('PixService');
        try {
            await pixService.find(params).toPromise();
            return false;
        }
        catch (error) {
            if (error.details === "no key was found") {
                throw new common_1.NotFoundException;
            }
            throw new common_1.InternalServerErrorException("Server not available");
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('bankAccountId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PixKeyController.prototype, "index", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('bankAccountId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ errorHttpStatusCode: 422 }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pix_key_dto_1.PixKeyDto]),
    __metadata("design:returntype", Promise)
], PixKeyController.prototype, "store", null);
__decorate([
    (0, common_1.Get)('exists'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ errorHttpStatusCode: 422 }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pix_key_exists_dto_1.PixKeyExistsDto]),
    __metadata("design:returntype", Promise)
], PixKeyController.prototype, "exists", null);
PixKeyController = __decorate([
    (0, common_1.Controller)('bank-accounts/:bankAccountId/pix-keys'),
    __param(0, (0, typeorm_1.InjectRepository)(pix_key_model_1.PixKey)),
    __param(1, (0, typeorm_1.InjectRepository)(BankAccount_model_1.BankAccount)),
    __param(2, (0, common_1.Inject)('CODEPIX_PACKAGE')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object])
], PixKeyController);
exports.PixKeyController = PixKeyController;
//# sourceMappingURL=pix-key.controller.js.map