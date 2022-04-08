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
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const typeorm_1 = require("@nestjs/typeorm");
const transaction_dto_1 = require("../../dto/transaction.dto");
const BankAccount_model_1 = require("../../models/BankAccount.model");
const pix_key_model_1 = require("../../models/pix-key.model");
const transaction_model_1 = require("../../models/transaction.model");
const Repository_1 = require("typeorm/repository/Repository");
let TransactionsController = class TransactionsController {
    constructor(bankAccountRepo, transactionRepo, pixKeyRepo, kafkaClient) {
        this.bankAccountRepo = bankAccountRepo;
        this.transactionRepo = transactionRepo;
        this.pixKeyRepo = pixKeyRepo;
        this.kafkaClient = kafkaClient;
    }
    async onModuleInit() {
        this.kafkaProducer = await this.kafkaClient.connect();
    }
    async onModuleDestroy() {
        await this.kafkaProducer.disconnect();
    }
    index(bankAccountId) {
        return this.transactionRepo.find({
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
        let transaction = this.transactionRepo.create(Object.assign(Object.assign({}, body), { amount: body.amount * -1, bank_account_id: bankAccountId, operation: transaction_model_1.TransactionOperation.debit }));
        transaction = await this.transactionRepo.save(transaction);
        const sendData = {
            id: transaction.external_id,
            accountId: bankAccountId,
            amount: body.amount,
            pixKeyTo: body.pix_key_to,
            pixKeyKindTo: body.pix_key_kind_to,
            description: body.description
        };
        await this.kafkaProducer.send({
            topic: 'transactions',
            messages: [
                { key: 'transactions', value: JSON.stringify(sendData) }
            ]
        });
        return transaction;
    }
    async doTransaction(message) {
        if (message.value.status === 'pending') {
            await this.receivedTransaction(message.value);
        }
        if (message.value.status === 'confirmed') {
            await this.confirmedTransaction(message.value);
        }
    }
    async receivedTransaction(data) {
        const pixKey = await this.pixKeyRepo.findOneOrFail({
            where: {
                key: data.pixKeyTo,
                kind: data.pixKeyKindTo
            }
        });
        const transaction = this.transactionRepo.create({
            external_id: data.id,
            amount: data.amount,
            description: data.description,
            bank_account_id: pixKey.bank_account_id,
            bank_account_from_id: data.accountId,
            operation: transaction_model_1.TransactionOperation.credit,
            status: transaction_model_1.TransactionStatus.completed
        });
        this.transactionRepo.save(transaction);
        const sendData = Object.assign(Object.assign({}, data), { status: 'confirmed' });
        await this.kafkaProducer.send({
            topic: 'transaction_confirmation',
            messages: [
                { key: 'transaction_confirmation', value: JSON.stringify(sendData) }
            ]
        });
    }
    async confirmedTransaction(data) {
        const transaction = await this.transactionRepo.findOneOrFail({
            where: {
                external_id: data.id
            }
        });
        await this.transactionRepo.update({ id: data.id }, { status: transaction_model_1.TransactionStatus.completed });
        const sendData = {
            id: data.id,
            accountId: transaction.bank_account_id,
            amount: Math.abs(transaction.amount),
            pixKeyTo: transaction.pix_key_to,
            pixKeyKindTo: transaction.pix_key_kind_to,
            description: transaction.description,
            status: transaction_model_1.TransactionStatus.completed
        };
        await this.kafkaProducer.send({
            topic: 'transaction_confirmation',
            messages: [
                { key: 'transaction_confirmation', value: JSON.stringify(sendData) }
            ]
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('bankAccountId', new common_1.ParseUUIDPipe({ version: '4', errorHttpStatusCode: 422 }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "index", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('bankAccountId', new common_1.ParseUUIDPipe({ version: '4', errorHttpStatusCode: 422 }))),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ errorHttpStatusCode: 422 }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, transaction_dto_1.TransactionDto]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "store", null);
__decorate([
    (0, microservices_1.MessagePattern)(`bank${process.env.BANK_CODE}`),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "doTransaction", null);
TransactionsController = __decorate([
    (0, common_1.Controller)('bank-accounts/:bankAccountId/transactions'),
    __param(0, (0, typeorm_1.InjectRepository)(BankAccount_model_1.BankAccount)),
    __param(1, (0, typeorm_1.InjectRepository)(transaction_model_1.Transaction)),
    __param(2, (0, typeorm_1.InjectRepository)(pix_key_model_1.PixKey)),
    __param(3, (0, common_1.Inject)('TRANSACTION_SERVICE')),
    __metadata("design:paramtypes", [Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository,
        microservices_1.ClientKafka])
], TransactionsController);
exports.TransactionsController = TransactionsController;
//# sourceMappingURL=transactions.controller.js.map