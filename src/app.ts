/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request } from 'express'
const app: Application = express()
import userRoute from './app/module/user/user.route'
import bookroute from './app/module/book/book.route'
import authRoute from './app/module/auth/auth.route'
import reviewRoute from './app/module/review/reviewRoute'

import cors from 'cors'
import bodyParser from 'body-parser'

import globalErrorHandler from './middleware/globalErrorHandler'
import {} from './app/module/user/user.utils'

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use('/api/v1/', userRoute)
app.use('/api/v1/', bookroute)
// app.use('/api/v1/auth', authRoute)
app.use('/api/v1/', reviewRoute)

class ApiError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message)
    this.statusCode = statusCode
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

//global error handler

app.get('/', (req: Request, res, next: NextFunction) => {
  res.send('Hello World!')
})
app.use(globalErrorHandler) // global error handler

// Handle not found request
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Not Found',
    data: null,
  })
})

app.use(globalErrorHandler) // global error handler))

export default app
