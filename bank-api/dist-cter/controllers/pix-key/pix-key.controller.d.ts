import { ClientGrpc } from '@nestjs/microservices';
import { PixKeyExistsDto } from 'src/dto/pix-key-exists.dto';
import { PixKeyDto } from 'src/dto/pix-key.dto';
import { BankAccount } from 'src/models/BankAccount.model';
import { PixKey } from 'src/models/pix-key.model';
import { Repository } from 'typeorm';
export declare class PixKeyController {
    private pixKeyRepo;
    private bankAccountRepo;
    private client;
    constructor(pixKeyRepo: Repository<PixKey>, bankAccountRepo: Repository<BankAccount>, client: ClientGrpc);
    index(bankAccountId: string): Promise<PixKey[]>;
    store(bankAccountId: string, body: PixKeyDto): Promise<PixKey>;
    checkPixKeyNotFound(params: {
        key: string;
        kind: string;
    }): Promise<boolean>;
    exists(params: PixKeyExistsDto): Promise<boolean>;
}
