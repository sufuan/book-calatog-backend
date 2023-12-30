import { z } from 'zod'

enum Location {
  Dhaka = 'Dhaka',
  Chattogram = 'Chattogram',
  Barishal = 'Barishal',
  Rajshahi = 'Rajshahi',
  Sylhet = 'Sylhet',
  Comilla = 'Comilla',
  Rangpur = 'Rangpur',
  Mymensingh = 'Mymensingh',
}

enum Breed {
  Brahman = 'Brahman',
  Nellore = 'Nellore',
  Sahiwal = 'Sahiwal',
  Gir = 'Gir',
  Indigenous = 'Indigenous',
  Tharparkar = 'Tharparkar',
  Kankrej = 'Kankrej',
}

enum Label {
  ForSale = 'for sale',
  SoldOut = 'sold out',
}

enum Category {
  Dairy = 'Dairy',
  Beef = 'Beef',
  DualPurpose = 'Dual Purpose',
}

export const UpdateCowValidationSchema = z.object({
  name: z.string().refine(value => value.trim() !== '', {
    message: 'Name is required',
  }),
  age: z.number().refine(value => value !== undefined, {
    message: 'Age is required',
  }),
  price: z.number().refine(value => value !== undefined, {
    message: 'Price is required',
  }),
  location: z
    .enum([...Object.values(Location)] as const)
    .refine(value => value !== undefined, { message: 'Location is required' }),
  breed: z
    .enum([...Object.values(Breed)] as const)
    .refine(value => value !== undefined, { message: 'Breed is required' }),
  weight: z.number().refine(value => value !== undefined, {
    message: 'Weight is required',
  }),
  label: z.enum([...Object.values(Label)] as const).default(Label.ForSale),
  category: z
    .enum([...Object.values(Category)] as const)
    .refine(value => value !== undefined, { message: 'Category is required' }),
  seller: z.string().refine(value => value.trim() !== '', {
    message: 'Seller ID is required',
  }), // Assuming seller ID is a string, adjust accordingly
})

export type UserZodSchema = z.infer<typeof UpdateCowValidationSchema>

export const updatrcowValidation = {
  UpdateCowValidationSchema,
}
