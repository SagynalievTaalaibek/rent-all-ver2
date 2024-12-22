import { IsString, IsArray, IsBoolean, IsMongoId } from 'class-validator';

export class CreateItemDto {
    @IsString()
    title: string;

    @IsMongoId()
    category: string;

    @IsMongoId()
    mainCategoryId: string;

    @IsArray()
    images: string[];

    @IsString()
    price: string;

    @IsString()
    description: string;

    @IsString()
    location: string;

    @IsMongoId()
    user: string;

    @IsBoolean()
    availability: boolean;
}
