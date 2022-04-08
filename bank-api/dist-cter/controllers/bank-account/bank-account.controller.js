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
exports.BankAccountController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const BankAccount_model_1 = require("../../models/BankAccount.model");
const typeorm_2 = require("typeorm");
let BankAccountController = class BankAccountController {
    constructor(bankAccountRepo) {
        this.bankAccountRepo = bankAccountRepo;
    }
    index() {
        return this.bankAccountRepo.find();
    }
    show(bankAccountId) {
        return this.bankAccountRepo.findOneOrFail({ where: { id: bankAccountId } });
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BankAccountController.prototype, "index", null);
__decorate([
    (0, common_1.Get)(':bankAccountId'),
    __param(0, (0, common_1.Param)('bankAccountId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BankAccountController.prototype, "show", null);
BankAccountController = __decorate([
    (0, common_1.Controller)('bank-accounts'),
    __param(0, (0, typeorm_1.InjectRepository)(BankAccount_model_1.BankAccount)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BankAccountController);
exports.BankAccountController = BankAccountController;
//# sourceMappingURL=bank-account.controller.js.map