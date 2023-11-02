import { checkEnvironmentVariables } from './environment.js';
import { connectToDatabase, closeDatabaseConnection } from './db.js';
import { readFile } from './data/readFile.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';

async function main() {
  try {
    checkEnvironmentVariables();
    await connectToDatabase();
    
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

    closeDatabaseConnection();
  } catch (err) {
    console.error('Error:', err);
  }
}

main();