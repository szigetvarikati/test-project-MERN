import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    vat: { type: Number, required: true },
  },
  { versionKey: false }
);

const Product = mongoose.model('adat', productSchema, 'adat');

export default Product;
