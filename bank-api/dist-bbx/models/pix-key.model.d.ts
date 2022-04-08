import { BankAccount } from "./BankAccount.model";
export declare enum PixKeyKind {
    cpf = "cpf",
    email = "email"
}
export declare class PixKey {
    id: string;
    kind: PixKeyKind;
    key: string;
    bankAccount: BankAccount;
    bank_account_id: string;
    created_at: Date;
    generateId(): void;
}
