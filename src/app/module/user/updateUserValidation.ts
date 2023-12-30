import { z } from 'zod'

// Define Zod validation schema for name
const nameSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

// Define enum for gender
const gender = ['Male', 'Female', 'Other'] as const

// Define Zod validation schema for the entire user
const UpdateuserZodSchema = z.object({
  password: z.string().optional(),
  role: z.string().optional(),
  name: nameSchema,
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  budget: z.number().optional(),
  income: z.number().optional(),
  gender: z.enum([...gender] as const, {}).optional(),
  dateOfBirth: z.string().optional(),
})

export type UpdateUserZodSchema = z.infer<typeof UpdateuserZodSchema>

export const UpdateUserValidation = {
  UpdateuserZodSchema,
}
