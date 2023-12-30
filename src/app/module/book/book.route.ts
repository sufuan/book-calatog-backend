import express from 'express'
import { bookController } from './bookcontroller'
import validateRequest from '../../../middleware/validateRequest'
import { updatrcowValidation } from './updateCowValidation'

const router = express.Router()

router.post('/book', bookController.createBook)

router.get('/book', bookController.getallbooks)
router.get('/book/:id', bookController.getSingleBook)
router.delete('/book/:id', bookController.deleteBook)

router.patch(
  '/book/:id',
  // validateRequest(updatrcowValidation.UpdateCowValidationSchema),
  bookController.updateBook,
)

export default router
