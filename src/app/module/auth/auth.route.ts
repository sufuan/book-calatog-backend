import express from 'express'
import validateRequest from '../../../middleware/validateRequest'
import { AuthValidation } from './authValidation'
import { loginuser } from './auth.controller'

const router = express.Router()


router.post('/login', validateRequest(AuthValidation.loginZodSchema), loginuser)


router.post('/refresh-token', validateRequest(AuthValidation.tokenZodSchema), refreshTokens)


export default router
