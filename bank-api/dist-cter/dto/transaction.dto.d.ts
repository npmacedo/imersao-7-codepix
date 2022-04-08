import { PixKeyKind } from "src/models/pix-key.model";
export declare class TransactionDto {
    pix_key_to: string;
    pix_key_kind_to: PixKeyKind;
    description: string;
    readonly amount: number;
}
