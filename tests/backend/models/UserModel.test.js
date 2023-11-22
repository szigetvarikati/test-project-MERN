import mongoose from 'mongoose';
import { User } from '../../../backend/db/models/userModel';

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/homework', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('UserModel', () => {
  it('should create and save a new user', async () => {
    const userData = {
      firstname: 'John',
      lastname: 'Doe',
      username: 'john.doe',
      email: 'john.doe@example.com',
      password: 'password123',
      isAdmin: false,
    };

    const validUser = new User(userData);
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.firstname).toBe(userData.firstname);
    expect(savedUser.lastname).toBe(userData.lastname);
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
    expect(savedUser.isAdmin).toBe(userData.isAdmin);
  });

  it('should find a user by username', async () => {
    const usernameToFind = 'john.doe';
    const foundUser = await User.findOne({ username: usernameToFind });

    expect(foundUser).toBeDefined();
    expect(foundUser.username).toBe(usernameToFind);
  });

  it('should not find a user with invalid username', async () => {
    const invalidUsername = 'nonexistent.user';
    const foundUser = await User.findOne({ username: invalidUsername });

    expect(foundUser).toBeNull();
  });
});
