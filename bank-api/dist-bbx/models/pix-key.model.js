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
exports.PixKey = exports.PixKeyKind = void 0;
const typeorm_1 = require("typeorm");
const BankAccount_model_1 = require("./BankAccount.model");
const uuid_1 = require("uuid");
var PixKeyKind;
(function (PixKeyKind) {
    PixKeyKind["cpf"] = "cpf";
    PixKeyKind["email"] = "email";
})(PixKeyKind = exports.PixKeyKind || (exports.PixKeyKind = {}));
let PixKey = class PixKey {
    generateId() {
        if (this.id) {
            return;
        }
        this.id = (0, uuid_1.v4)();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PixKey.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PixKey.prototype, "kind", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PixKey.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BankAccount_model_1.BankAccount),
    (0, typeorm_1.JoinColumn)({ name: 'bank_account_id' }),
    __metadata("design:type", BankAccount_model_1.BankAccount)
], PixKey.prototype, "bankAccount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PixKey.prototype, "bank_account_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], PixKey.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PixKey.prototype, "generateId", null);
PixKey = __decorate([
    (0, typeorm_1.Entity)({ name: 'pix_keys' })
], PixKey);
exports.PixKey = PixKey;
//# sourceMappingURL=pix-key.model.js.map