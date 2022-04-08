import { BankAccount } from "./BankAccount.model";
import { PixKeyKind } from "./pix-key.model";
export declare enum TransactionStatus {
    pending = "pending",
    completed = "completed",
    error = "error"
}
export declare enum TransactionOperation {
    debit = "debit",
    credit = "credit"
}
export declare class Transaction {
    id: string;
    external_id: string;
    amount: number;
    description: string;
    bankAccount: BankAccount;
    bank_account_id: string;
    bankAccountFrom: BankAccount;
    bank_account_from_id: string;
    pix_key_to: string;
    pix_key_kind_to: PixKeyKind;
    status: TransactionStatus;
    operation: TransactionOperation;
    created_at: Date;
    generateId(): void;
    generateExternalId(): void;
}
