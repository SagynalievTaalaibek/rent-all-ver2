import {IsMongoId, IsString} from "class-validator";

export class CreateCategoryDto {
    @IsMongoId()
    mainCategoryId: string;

    @IsString()
    category: string;
}
