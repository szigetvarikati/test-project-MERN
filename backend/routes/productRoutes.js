import express from 'express';
import Product from '../db/models/productModel.js';
//import data from '../db/data.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});
export default productRouter;
