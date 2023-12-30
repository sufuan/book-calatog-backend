import express from 'express'
import { userController } from './user.controller'
import validateRequest from '../../../middleware/validateRequest'
import { UserValidation } from './userValidation'
import { UpdateUserValidation } from './updateUserValidation'

const router = express.Router()

router.post(
  '/auth/signup',
  validateRequest(UserValidation.userZodSchema),
  userController.createUser,
)
router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.getSingleUser)
router.delete('/users/:id', userController.deleteSingleUser)

router.patch(
  '/users/:id',
  validateRequest(UpdateUserValidation.UpdateuserZodSchema),
  userController.updateSingleUser,
)

export default router
