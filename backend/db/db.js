import mongoose from 'mongoose';

export async function connectToDatabase() {
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export function closeDatabaseConnection() {
  return mongoose.connection.close();
}