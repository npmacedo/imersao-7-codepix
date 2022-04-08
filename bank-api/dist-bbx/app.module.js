"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const BankAccount_model_1 = require("./models/BankAccount.model");
const bank_account_controller_1 = require("./controllers/bank-account/bank-account.controller");
const nestjs_console_1 = require("nestjs-console");
const fixtures_command_1 = require("./fixtures/fixtures.command");
const pix_key_controller_1 = require("./controllers/pix-key/pix-key.controller");
const pix_key_model_1 = require("./models/pix-key.model");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const transactions_controller_1 = require("./controllers/transactions/transactions.controller");
const transaction_model_1 = require("./models/transaction.model");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            nestjs_console_1.ConsoleModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: process.env.TYPEORM_CONNECTION,
                host: process.env.TYPEORM_HOST,
                port: parseInt(process.env.TYPEORM_PORT),
                username: process.env.TYPEORM_USERNAME,
                password: process.env.TYPEORM_PASSWORD,
                database: process.env.TYPEORM_DATABASE,
                entities: [BankAccount_model_1.BankAccount, pix_key_model_1.PixKey, transaction_model_1.Transaction]
            }),
            typeorm_1.TypeOrmModule.forFeature([BankAccount_model_1.BankAccount, pix_key_model_1.PixKey, transaction_model_1.Transaction]),
            microservices_1.ClientsModule.register([{
                    name: 'CODEPIX_PACKAGE',
                    transport: microservices_1.Transport.GRPC,
                    options: {
                        url: process.env.GRPC_URL,
                        package: 'github.com.npmacedo.codepix',
                        protoPath: [(0, path_1.join)(__dirname, 'protofiles/pixkey.proto')]
                    }
                }]),
            microservices_1.ClientsModule.register([{
                    name: 'TRANSACTION_SERVICE',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: process.env.KAFKA_CLIENT_ID,
                            brokers: [process.env.KAFKA_BROKER]
                        },
                        consumer: {
                            groupId: (!process.env.KAFKA_CONSUMER_GROUP_ID || process.env.KAFKA_CONSUMER_GROUP_ID === '') ? 'my-consumer-' + Math.random() : process.env.KAFKA_CONSUMER_GROUP_ID
                        }
                    }
                }])
        ],
        controllers: [bank_account_controller_1.BankAccountController, pix_key_controller_1.PixKeyController, transactions_controller_1.TransactionsController],
        providers: [fixtures_command_1.FixtureCommand],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map