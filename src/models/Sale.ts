import mongoose, { Schema, Document } from 'mongoose';

interface ISale extends Document {
    salesID: string;
    productID: string;
    quantity: number;
    date: Date;
    totalAmount: number;
}

const SaleSchema: Schema = new Schema({
    salesID: { type: String, required: true },
    productID: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
});

export default mongoose.model<ISale>('Sale', SaleSchema);
