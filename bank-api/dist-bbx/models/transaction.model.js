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
exports.Transaction = exports.TransactionOperation = exports.TransactionStatus = void 0;
const typeorm_1 = require("typeorm");
const BankAccount_model_1 = require("./BankAccount.model");
const uuid_1 = require("uuid");
const pix_key_model_1 = require("./pix-key.model");
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["pending"] = "pending";
    TransactionStatus["completed"] = "completed";
    TransactionStatus["error"] = "error";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
var TransactionOperation;
(function (TransactionOperation) {
    TransactionOperation["debit"] = "debit";
    TransactionOperation["credit"] = "credit";
})(TransactionOperation = exports.TransactionOperation || (exports.TransactionOperation = {}));
let Transaction = class Transaction {
    constructor() {
        this.status = TransactionStatus.pending;
    }
    generateId() {
        if (this.id) {
            return;
        }
        this.id = (0, uuid_1.v4)();
    }
    generateExternalId() {
        if (this.external_id) {
            return;
        }
        this.external_id = (0, uuid_1.v4)();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "external_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BankAccount_model_1.BankAccount),
    (0, typeorm_1.JoinColumn)({ name: "bank_account_id" }),
    __metadata("design:type", BankAccount_model_1.BankAccount)
], Transaction.prototype, "bankAccount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "bank_account_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BankAccount_model_1.BankAccount),
    (0, typeorm_1.JoinColumn)({ name: "bank_account_from_id" }),
    __metadata("design:type", BankAccount_model_1.BankAccount)
], Transaction.prototype, "bankAccountFrom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "bank_account_from_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "pix_key_to", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "pix_key_kind_to", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "operation", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Transaction.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Transaction.prototype, "generateId", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Transaction.prototype, "generateExternalId", null);
Transaction = __decorate([
    (0, typeorm_1.Entity)({ name: 'transactions' })
], Transaction);
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.model.js.map