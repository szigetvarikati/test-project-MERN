import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

dotenv.config();

const filepath = process.env.FILE_PATH;
if (!filepath) {
  console.error('Missing FILE_PATH environment variable');
  process.exit(1);
}

const filePathProducts = path.join(filepath, 'products.json');
const filePathUsers = path.join(filepath, 'users.json');

const readFile = async () => {
  try {
    const products = await fs.readFile(filePathProducts, 'utf8');
    const users = await fs.readFile(filePathUsers, 'utf8');
    const productData = JSON.parse(products);
    const userData = JSON.parse(users);

    for (const user of userData) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
    return { products: productData, users: userData };
  } catch (error) {
    throw error;
  }
};

import Product from './models/productModel.js';
import User from './models/userModel.js';

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    await User.deleteMany({});

    const data = await readFile();
    const products = data.products;
    const users = data.users;
    await Product.create(products);
    console.log('Products uploaded successfully');
    await User.create(users);
    console.log('Users uploaded successfully');

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB: ' + err);
  });
