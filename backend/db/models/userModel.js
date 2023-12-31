import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model('user', userSchema, 'user');

export default User;
