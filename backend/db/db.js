import mongoose from 'mongoose';

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error.message);
  }
}

export function closeDatabaseConnection() {
  return mongoose.connection.close();
}
