import express from 'express';
import Product from '../db/models/productModel.js';
import data from '../db/data.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);

  res.send({ createdProducts });
});
export default productRouter;
