import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MainCategoryDocument = HydratedDocument<MainCategory>;

@Schema()
export class MainCategory {
    @Prop({ required: true, unique: true })
    mainCategoryName: string;
}

export const MainCategorySchema = SchemaFactory.createForClass(MainCategory);
