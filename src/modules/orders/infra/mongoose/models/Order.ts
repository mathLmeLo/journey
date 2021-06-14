import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  dealId: string;
  title: string;
  amount: number;
  value: number;
}

const OrderSchema = new Schema({
  dealId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', OrderSchema);
