import bcrypt from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'
import User from '../user/user.model'

const loginuser = async (req, res) => {
  try {
    const { id, password } = req.body

    // Check if the user exists
    const user = await User.findOne({ id })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed. User not found.',
      })
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user?.password)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed. Incorrect password.',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Authentication successful',

      user: {
        id: user.id,
        // Include other user properties as needed
      },
    })
  } catch (error) {
    next(error)
  }
}

export const authServices = {
  loginuser,
}
