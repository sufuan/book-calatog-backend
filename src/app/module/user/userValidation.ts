import { z } from 'zod'

// Define Zod validation schema for name
const nameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

// Define enum for gender
const gender = ['Male', 'Female', 'Other'] as const

// Define Zod validation schema for the entire user
const userZodSchema = z.object({
  password: z.string(),
  role: z.string(),
  name: nameSchema,
  phoneNumber: z.string(),
  address: z.string(),
  budget: z.number(),
  income: z.number(),
  gender: z
    .enum([...gender] as const, {
      required_error: 'Gender is required',
    })
    .refine(value => value !== undefined, {
      message: 'Gender is required',
    }),
  dateOfBirth: z.string().refine(value => value !== undefined, {
    message: 'Date of birth is required',
  }),
})

export type UserZodSchema = z.infer<typeof userZodSchema>

export const UserValidation = {
  userZodSchema,
}
