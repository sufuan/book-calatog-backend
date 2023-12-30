import User from './user.model'

export const getLastStudentId = async () => {
  const lastStudentId = await User.findOne().sort({ createdAt: -1 }).lean()

  return lastStudentId?.id ? lastStudentId?.id.substring(4) : undefined
}
// Function to generate a new 5-digit user ID
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateStudentID = async (academicSemester: any) => {
  const currentUserId =
    (await getLastStudentId()) || (0).toString().padStart(5, '0')
  let incrementedId = (parseInt(currentUserId, 10) + 1)
    .toString()
    .padStart(5, '0')

  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`

  return incrementedId
}

export const getLastFacultyId = async () => {
  const lastFacultyId = await User.findOne().sort({ createdAt: -1 }).lean()

  return lastFacultyId?.id
}
// Function to generate a new 5-digit user ID
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateFacultyID = async () => {
  const currentFacultyId =
    (await getLastFacultyId()) || (0).toString().padStart(5, '0')

  let incrementedId = (parseInt(currentFacultyId) + 1)
    .toString()
    .padStart(5, '0')

  incrementedId = `F-${incrementedId}`

  // return incrementedId
  console.log(incrementedId)
}

// import { User } from './user.model'
// export const getLastUserId = async () => {
//   const lastUserId = await User.findOne().sort({ createdAt: -1 }).lean()

//   return lastUserId?.id
// }
// // Function to generate a new 5-digit user ID
// export const generateUserID = async () => {
//   const currentUserId =
//     (await getLastUserId()) || (0).toString().padStart(5, '0')
//   const incrementedId = (parseInt(currentUserId, 10) + 1)
//     .toString()
//     .padStart(5, '0')

//   return incrementedId
// }
