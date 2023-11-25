import { Model } from 'mongoose';

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: Array<{
    //this field is optional
    productName: string;
    price: number;
    quantity: number;
  }>;
};

export interface UserModel extends Model<TUser> {
  isUserExist(userId: number): Promise<TUser | null>;
}
