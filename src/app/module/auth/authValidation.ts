import { z } from 'zod'

// Define Zod validation schema for name

// Define Zod validation schema for the entire user
const loginZodSchema = z.object({
  phoneNumber: z.string({
    required_error: 'phoneNumber is required',
  }),
  password: z.string({
    required_error: 'password is required',
  }),
})

const tokenZodSchema = z.object({
  refreshtoken: z.string({
    required_error: 'refreshtoken is required',
  }),
})

export type UserZodSchema = z.infer<typeof loginZodSchema>

export const AuthValidation = {
  loginZodSchema,
  tokenZodSchema,
}
