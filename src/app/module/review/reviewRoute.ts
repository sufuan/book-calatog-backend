import express from 'express'
import { reviewController } from './review.controller'

const router = express.Router()

router.post('/review', reviewController.review)

export default router
