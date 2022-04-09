import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from 'src/models/BankAccount.model';
import { Transaction } from 'src/models/transaction.model';
import { Connection, EntitySubscriberInterface, InsertEvent, Repository } from 'typeorm';

@Injectable()
export class TransactionSubscriber implements EntitySubscriberInterface<Transaction> {

    constructor(
        connection: Connection,
        @InjectRepository(BankAccount)
        private bankAccountRepo: Repository<BankAccount>
    ){
        connection.subscribers.push(this)
    }


    listenTo() {
        return Transaction
    }

    async afterInsert(event: InsertEvent<Transaction>) {
        const transaction = event.entity;

        const bankAccount = await this.bankAccountRepo.findOneOrFail({
            where: {id: transaction.bank_account_id}
        })

        bankAccount.balance = bankAccount.balance + transaction.amount

        await this.bankAccountRepo.save(bankAccount)
    }
}
