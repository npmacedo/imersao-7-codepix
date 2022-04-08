"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionTable1649419051857 = void 0;
const typeorm_1 = require("typeorm");
class CreateTransactionTable1649419051857 {
    async up(queryRunner) {
        queryRunner.createTable(new typeorm_1.Table({
            name: 'transactions',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'external_id',
                    type: 'uuid'
                },
                {
                    name: 'amount',
                    type: 'double precision'
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'bank_account_id',
                    type: 'uuid'
                },
                {
                    name: 'bank_account_from_id',
                    type: 'uuid',
                    isNullable: true
                },
                {
                    name: 'pix_key_to',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'pix_key_kind_to',
                    type: 'varchar',
                    isNullable: true
                }, {
                    name: 'status',
                    type: 'varchar'
                }, {
                    name: 'operation',
                    type: 'varchar'
                }, {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }));
        await queryRunner.createForeignKey('transactions', new typeorm_1.TableForeignKey({
            name: 'transactions_bank_account_id_foreign_key',
            columnNames: ['bank_account_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'bank_accounts'
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('transactions', 'transactions_bank_account_id_foreign_key');
        await queryRunner.dropTable('transactions');
    }
}
exports.CreateTransactionTable1649419051857 = CreateTransactionTable1649419051857;
//# sourceMappingURL=1649419051857-CreateTransactionTable.js.map