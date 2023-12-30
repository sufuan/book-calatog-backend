import mongoose, { Document } from 'mongoose'
import { IUser } from './user.interface'
import bcrypt from 'bcryptjs'

// Create the Mongoose schema
const UserSchema = new mongoose.Schema<IUser & Document>(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
    },
    name: {
      firstName: {
        type: String,
        required: [true, 'First name is required'],
      },
      lastName: {
        type: String,
        required: [true, 'Last name is required'],
      },
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    budget: {
      type: Number,
      required: [true, 'Budget is required'],
    },
    income: {
      type: Number,
      required: [true, 'Income is required'],
    },
  },
  { timestamps: true }, // Add timestamps option
)

// Create the User model
const UserModel = mongoose.model<IUser & Document>('User', UserSchema)

UserSchema.pre('save', async function (next) {
  const user = this as IUser & Document

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(user.password, salt)
  user.password = hashedPassword

  next()
})

export default UserModel
