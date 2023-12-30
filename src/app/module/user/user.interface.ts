export type IUser = {
  password: string
  role: string
  name: {
    firstName: string
    lastName: string
  }
  phoneNumber: string
  address: string
  budget: number
  income: number
}
