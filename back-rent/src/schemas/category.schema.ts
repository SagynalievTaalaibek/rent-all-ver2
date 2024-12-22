import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
    @Prop({ required: true, type: Types.ObjectId, ref: 'MainCategory' })
    mainCategoryId: Types.ObjectId;

    @Prop({ required: true })
    category: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
