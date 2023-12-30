import User from '../user/user.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../../../config'

export const loginuser = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body
    console.log('Login request:', phoneNumber, password)

    // Use findById with the extracted ID
    const user = await User.findOne({ phoneNumber }).select('+password')

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

    // Create a JWT token
    const jwtSecret = config.jwt_secret || 'default_secret_value'
    const accessToken = jwt.sign(
      {
        id: user?.id,
        role: user?.role,
      },
      jwtSecret,
      {
        expiresIn: config.jwt_expiration,
      },
    )

    // Create a JWT refresh token
    const jwtRefreshSecret =
      config.jwt_refresh_secret || 'default_refresh_secret_value'
    const refreshToken = jwt.sign(
      {
        id: user?.id,
        role: user?.role,
      },
      jwtRefreshSecret,
      {
        expiresIn: config.jwt_refresh_expiration,
      },
    )

    // Send the access and refresh tokens to the client inside a cookie
    const cookieOptions = {
      httpOnly: true,
    }

    res.cookie('refreshToken', refreshToken, cookieOptions)

    res.status(200).json({
      success: true,
      message: 'Authentication successful',
      user: {
        id: user.id,
        // Include other user properties as needed
      },
    })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

export const refreshTokens = async (req, res) => {
  // try {
  //   const { refreshToken } = req.cookies
  //   console.log('Login request:', phoneNumber, password)
  //   // Use findById with the extracted ID
  //   const user = await User.findOne({ phoneNumber }).select('+password')
  //   if (!user) {
  //     return res.status(401).json({
  //       success: false,
  //       message: 'Authentication failed. User not found.',
  //     })
  //   }
  //   // Compare the provided password with the hashed password in the database
  //   const isPasswordValid = await bcrypt.compare(password, user?.password)
  //   if (!isPasswordValid) {
  //     return res.status(401).json({
  //       success: false,
  //       message: 'Authentication failed. Incorrect password.',
  //     })
  //   }
  //   // Create a JWT token
  //   // const jwtSecret = config.jwt_secret || 'default_secret_value'
  //   // const accessToken = jwt.sign(
  //   //   {
  //   //     id: user?.id,
  //   //     role: user?.role,
  //   //   },
  //   //   jwtSecret,
  //   //   {
  //   //     expiresIn: config.jwt_expiration,
  //   //   },
  //   // )
  //   // Create a JWT refresh token
  //   // const jwtRefreshSecret =
  //   //   config.jwt_refresh_secret || 'default_refresh_secret_value'
  //   // const refreshToken = jwt.sign(
  //   //   {
  //   //     id: user?.id,
  //   //     role: user?.role,
  //   //   },
  //   //   jwtRefreshSecret,
  //   //   {
  //   //     expiresIn: config.jwt_refresh_expiration,
  //   //   },
  //   // )
  //   // Send the access and refresh tokens to the client inside a cookie
  //   const cookieOptions = {
  //     httpOnly: true,
  //   }
  //   res.cookie('refreshToken', refreshToken, cookieOptions)
  //   res.status(200).json({
  //     success: true,
  //     message: 'Authentication successful',
  //     user: {
  //       id: user.id,
  //       // Include other user properties as needed
  //     },
  //   })
  // } catch (error) {
  //   console.error('Error during login:', error)
  //   res.status(500).json({
  //     success: false,
  //     message: 'Internal Server Error',
  //   })
  // }
}
