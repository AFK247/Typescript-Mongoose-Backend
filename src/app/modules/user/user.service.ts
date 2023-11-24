/* eslint-disable @typescript-eslint/no-unused-vars */
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserDB = async (user: TUser) => {
  const result = await User.create(user);

  const res = await User.find(
    { userId: result.userId },
    {
      _id: 0,
      __v: 0,
      password: 0,
      orders: 0,
    },
  );
  return res[0];
};

const getAllUsersDB = async () => {
  const result = await User.find(
    {},
    {
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
      _id: 0,
    },
  );
  return result;
};

const getSingleUserDB = async (userId: number) => {
  const user = await User.isUserExist(userId);

  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateSingleUserDB = async (userId: number, data: TUser) => {
  const user = await User.isUserExist(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const res = User.findOneAndUpdate(
    { userId },
    { $set: data },
    {
      returnDocument: 'after',
      projection: {
        _id: 0,
        __v: 0,
        password: 0,
        orders: 0,
      },
    },
  );

  return res;
};

const deleteSingleUserDB = async (userId: number) => {
  const user = await User.isUserExist(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const result = await User.deleteOne({ userId });

  if (result.acknowledged) {
    return null;
  }

  return result;
};

export const UserServices = {
  createUserDB,
  getAllUsersDB,
  getSingleUserDB,
  updateSingleUserDB,
  deleteSingleUserDB,
};
