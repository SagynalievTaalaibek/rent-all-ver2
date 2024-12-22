import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ type: [Types.ObjectId], ref: 'Item', required: true })
  items: Types.ObjectId[];

  @Prop({ type: Date, default: Date.now })
  date: Date;

  @Prop({
    type: String,
    enum: ['pending', 'payed', 'completed', 'canceled'],
    default: 'pending',
  })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  clientId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  ownerId: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
