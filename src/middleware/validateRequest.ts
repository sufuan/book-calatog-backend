import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

// Generic function to create a middleware for Zod validation
function validateRequest(validationSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body against the provided Zod schema
      const validatedData = validationSchema.parse(req.body)
      // Attach the validated data to the request object for further use
      req.validatedData = validatedData
      // If validation passes, proceed to the next middleware or route handler
      next()
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          statusCode: 400,
          message: 'Validation error',
          data: null,
          details: error.errors,
        })
      } else {
        // Handle other errors
        res.status(500).json({
          success: false,
          statusCode: 500,
          message: 'Internal server error',
          data: null,
        })
      }
    }
  }
}

export default validateRequest
