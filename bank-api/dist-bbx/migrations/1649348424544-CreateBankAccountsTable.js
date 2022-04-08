"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBankAccountsTable1649348424544 = void 0;
const typeorm_1 = require("typeorm");
class CreateBankAccountsTable1649348424544 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'bank_accounts',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'account_number',
                    type: 'varchar'
                },
                {
                    name: 'owner_name',
                    type: 'varchar'
                },
                {
                    name: 'balance',
                    type: 'double precision'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('bank_accounts');
    }
}
exports.CreateBankAccountsTable1649348424544 = CreateBankAccountsTable1649348424544;
//# sourceMappingURL=1649348424544-CreateBankAccountsTable.js.map