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
exports.FixtureCommand = void 0;
const nestjs_console_1 = require("nestjs-console");
const typeorm_1 = require("typeorm");
const chalk = require("chalk");
let FixtureCommand = class FixtureCommand {
    async command() {
        await this.runMigrations();
        const fixtures = (await Promise.resolve().then(() => require(`./fixtures.${process.env.BANK_CODE}`))).default;
        for (const fixture of fixtures) {
            await this.createInDatabase(fixture.model, fixture.fields);
        }
        console.log(chalk.green('Data generated'));
    }
    async runMigrations() {
        const conn = (0, typeorm_1.getConnection)('default');
        for (const migration of conn.migrations.reverse()) {
            await conn.undoLastMigration();
        }
    }
    async createInDatabase(model, data) {
        const repository = this.getRepository(model);
        const obj = repository.create(data);
        await repository.save(obj);
    }
    getRepository(model) {
        const conn = (0, typeorm_1.getConnection)('default');
        return conn.getRepository(model);
    }
};
__decorate([
    (0, nestjs_console_1.Command)({
        command: 'fixtures',
        description: 'Seed data in database'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FixtureCommand.prototype, "command", null);
FixtureCommand = __decorate([
    (0, nestjs_console_1.Console)()
], FixtureCommand);
exports.FixtureCommand = FixtureCommand;
//# sourceMappingURL=fixtures.command.js.map