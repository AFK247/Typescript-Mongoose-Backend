/* eslint-disable @typescript-eslint/no-unused-vars */
import { TUser } from './user.interface';
import { User } from './user.model';

const CreateUserDB = async (user: TUser) => {
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

export const UserServices = {
  CreateUserDB,
};
