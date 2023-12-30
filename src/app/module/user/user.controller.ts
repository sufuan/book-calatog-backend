import { NextFunction, Request, Response } from 'express'
import User from './user.model'
import config from '../../../config'
import bcrypt from 'bcryptjs'

// create a new user

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Received Request Body:', req.body)

  try {
    const { phoneNumber, password, ...userData } = req.body

    // Set a default password if not provided
    userData.password = password || config.default_user_password

    // Check if the phone number is already registered
    const existingUser = await User.findOne({ phoneNumber })

    if (existingUser) {
      // Phone number is already registered, send an error response
      return res.status(400).json({
        success: false,
        message: 'Phone number is already registered',
      })
    }

    // Phone number is not registered, create a new user
    userData.role = 'seller'

    // Hash the password using bcryptjs
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    userData.password = hashedPassword

    // Create a new user
    const result = await User.create({ phoneNumber, ...userData })

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    console.error('Error creating user:', error)
    next(error)
  }
}

export default createUser

// getAllUsers

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find()
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

// getSingleUser

const getSingleUser = async (req: Request, res: Response) => {
  const userId = req.params.id
  try {
    const user = await User.findById(userId)

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    })
  }
}

// deleteSingleUser

const deleteSingleUser = async (req: Request, res: Response) => {
  const userId = req.params.id // Assuming the user ID is in the route parameter

  try {
    const deletedUser = await User.findByIdAndDelete(userId)

    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    })
  }
}

// updateSingleUser

const updateSingleUser = async (req: Request, res: Response) => {
  const userId = req.params.id // Assuming the user ID is in the route parameter
  const updatedUserData = req.body

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    })

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    })
  }
}

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
}
