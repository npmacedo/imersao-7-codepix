"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePixKeyTable1649355173665 = void 0;
const typeorm_1 = require("typeorm");
class CreatePixKeyTable1649355173665 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'pix_keys',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'kind',
                    type: 'varchar',
                },
                {
                    name: 'key',
                    type: 'varchar',
                },
                {
                    name: 'bank_account_id',
                    type: 'uuid',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                }
            ]
        }));
        await queryRunner.createForeignKey('pix_keys', new typeorm_1.TableForeignKey({
            name: 'pix_keys_bank_account_id_foreign_key',
            columnNames: ['bank_account_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'bank_accounts'
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('pix_keys', 'pix_keys_bank_account_id_foreign_key');
        await queryRunner.dropTable('pix_keys');
    }
}
exports.CreatePixKeyTable1649355173665 = CreatePixKeyTable1649355173665;
//# sourceMappingURL=1649355173665-CreatePixKeyTable.js.map