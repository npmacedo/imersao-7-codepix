import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { PixKeyKind } from "src/models/pix-key.model";

export class TransactionDto {
    @IsString()
    @IsNotEmpty()
    pix_key_to: string

    @IsString()
    @IsNotEmpty()
    pix_key_kind_to: PixKeyKind

    @IsString()
    @IsOptional()
    description: string = null

    @IsNumber({maxDecimalPlaces: 2})
    @Min(0.01)
    @IsNotEmpty()
    readonly amount: number
}