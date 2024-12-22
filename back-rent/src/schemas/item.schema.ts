import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IsArray, IsBoolean, IsMongoId, IsString } from 'class-validator';
import { Category } from './category.schema';
import { User } from './user.schema';

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
  @Prop({ required: true })
  @IsString()
  title: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  @IsMongoId()
  category: Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MainCategory',
  })
  @IsMongoId()
  mainCategoryId: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  @IsArray()
  images: string[];

  @Prop({ required: true })
  @IsString()
  price: string;

  @Prop({ required: true })
  @IsString()
  description: string;

  @Prop({ required: true })
  @IsString()
  location: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @IsMongoId()
  user: Types.ObjectId;

  @Prop({ default: true })
  @IsBoolean()
  availability: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
