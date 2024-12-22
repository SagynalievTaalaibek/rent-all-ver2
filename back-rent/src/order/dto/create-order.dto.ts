import {IsArray, IsEnum, IsMongoId} from "class-validator";

export class CreateOrderDto {
    @IsArray()
    @IsMongoId({ each: true })
    items: string[];

    @IsEnum(['pending', 'payed', 'completed', 'canceled'])
    status: 'pending';

    @IsMongoId()
    clientId: string;

    @IsMongoId()
    ownerId: string;
}
