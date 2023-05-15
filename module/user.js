import { client } from '../config/connectDB.js';

// Collection name
const collectionName = 'users';

// User schema
const userSchema = {
  username: {
    type: 'string',
    required: true,
    minlength: 6,
    maxlength: 30,
    unique: true,
  },
  email: {
    type: 'string',
    required: true,
    minlength: 10,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: 'string',
    required: true,
    minlength: 6,
  },
  admin: {
    type: 'boolean',
    default: false,
  },
};

// Create indexes for username and email fields
const createIndexes = async () => {
  await client.db().collection(collectionName).createIndex({ username: 1 }, { unique: true });
  await client.db().collection(collectionName).createIndex({ email: 1 }, { unique: true });
};

// Add user to database
const findUser = async (usernameOrEmail) => {
  try {
    const result = await client.db().collection(collectionName).findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to find user');
  }
};

// Find user by email
const findUserByEmail = async (email) => {
  try {
    const result = await client.db().collection(collectionName).findOne({ email });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to find user');
  }
};

export { userSchema, createIndexes, findUser, findUserByEmail };
