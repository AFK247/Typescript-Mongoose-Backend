/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser } from './user.interface';
import config from '../../config';

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true, unique: true },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {
    type: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    required: true,
  },
  orders: {
    type: [
      {
        productName: { type: String },
        price: { type: Number },
        quantity: { type: Number },
      },
    ],
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const User = model<TUser>('User', userSchema);
