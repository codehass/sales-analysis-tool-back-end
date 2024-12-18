import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
    ProductID: string;
    ProductName: string;
    Category: string;
    Price: number;
}

const ProductSchema: Schema = new Schema({
    productID: { type: String, required: true },
    productName: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
