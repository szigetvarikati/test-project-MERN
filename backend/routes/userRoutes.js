import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../db/models/userModel.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

userRouter.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const existingUserEmail = await User.findOne({ email: req.body.email });
    const existongUsername = await User.findOne({
      username: req.body.username,
    });
    if (existingUserEmail) {
      res.status(409).send({ message: 'Email already taken' });
    } else if (existongUsername) {
      res.status(409).send({ message: 'Username already taken' });
    } else {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        isAdmin: false,
      });
      try {
        await newUser.save();
        res.send({ message: 'Successfully registration' });
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Registration failed' });
      }
    }
  })
);

export default userRouter;
