import mongoose from 'mongoose'
import ApiError from './ApiError'

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errors = Object.values(err.errors).map(val => val.message)
  const errorMessages = errors.join(', ')
  const msg = `Invalid input data. ${errorMessages}`
  return new ApiError(400, msg)
}

export default handleValidationError
