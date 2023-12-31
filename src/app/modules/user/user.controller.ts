/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';

//Create new user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const zodParsedData = userValidationSchema.parse(user);

    const result = await UserServices.createUserDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something Went Wrong',
      error,
    });
  }
};

//get all user
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

//get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getSingleUserDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: err.message + '!',
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = req.body;

    const result = await UserServices.updateSingleUserDB(Number(userId), data);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: err.message + '!',
      },
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.deleteSingleUserDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: err.message + '!',
      },
    });
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = req.body;

    const result = await UserServices.addProductDB(Number(userId), data);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: err.message + '!',
      },
    });
  }
};

const getSingleUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getSingleUserOrdersDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: err.message + '!',
      },
    });
  }
};

const getSingleUserTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getSingleUserTotalPriceDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: err.message + '!',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addProduct,
  getSingleUserOrders,
  getSingleUserTotalPrice,
};
