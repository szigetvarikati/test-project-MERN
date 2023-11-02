import express from 'express';
import Product from '../db/models/productModel.js';
import User from '../db/models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    const users = await User.find();
    res.send({ products, users });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

export default seedRouter;
