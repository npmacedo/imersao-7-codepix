export declare class BankAccount {
    id: string;
    account_number: string;
    owner_name: string;
    balance: number;
    created_at: Date;
    generateId(): void;
    initBalance(): void;
}
