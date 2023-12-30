import User from './user.model'
import { IUser } from './user.interface'

export const createUser = async (user: IUser) => {
  const result = await User.create(user)
  return result
}
