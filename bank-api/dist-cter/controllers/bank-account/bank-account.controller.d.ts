import { BankAccount } from 'src/models/BankAccount.model';
import { Repository } from 'typeorm';
export declare class BankAccountController {
    private bankAccountRepo;
    constructor(bankAccountRepo: Repository<BankAccount>);
    index(): Promise<BankAccount[]>;
    show(bankAccountId: string): Promise<BankAccount>;
}
