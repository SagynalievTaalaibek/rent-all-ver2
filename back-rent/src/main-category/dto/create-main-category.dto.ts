import {IsMongoId, IsString} from "class-validator";

export class CreateMainCategoryDto {
    @IsMongoId()
    mainCategoryId: string;

    @IsString()
    category: string;
}
