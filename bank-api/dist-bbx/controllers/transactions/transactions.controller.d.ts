import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { TransactionDto } from 'src/dto/transaction.dto';
import { BankAccount } from 'src/models/BankAccount.model';
import { PixKey } from 'src/models/pix-key.model';
import { Transaction } from 'src/models/transaction.model';
import { Repository } from 'typeorm/repository/Repository';
export declare class TransactionsController implements OnModuleInit, OnModuleDestroy {
    private bankAccountRepo;
    private transactionRepo;
    private pixKeyRepo;
    private kafkaClient;
    private kafkaProducer;
    constructor(bankAccountRepo: Repository<BankAccount>, transactionRepo: Repository<Transaction>, pixKeyRepo: Repository<PixKey>, kafkaClient: ClientKafka);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    index(bankAccountId: string): Promise<Transaction[]>;
    store(bankAccountId: string, body: TransactionDto): Promise<Transaction>;
    doTransaction(message: any): Promise<void>;
    receivedTransaction(data: any): Promise<void>;
    confirmedTransaction(data: any): Promise<void>;
}
