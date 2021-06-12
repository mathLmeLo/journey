import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  title: string;
  amount: number;
  value: number;
}

const OrderSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', OrderSchema);
