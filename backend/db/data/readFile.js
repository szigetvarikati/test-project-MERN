import fs from 'fs/promises';
import bcrypt from 'bcryptjs';
import path from 'path';

export async function readFile() {
  const filePathProducts = path.join(process.env.FILE_PATH, 'products.json');
  const filePathUsers = path.join(process.env.FILE_PATH, 'users.json');

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
}