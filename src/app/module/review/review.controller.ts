// import { Review } from './reviewModel'
// import { Book } from '../book/bookmodel'

// // Route for submitting a review
// const review = async (req, res) => {
//   try {
//     // const { bookId, rating, reviewText } = req.body
//     console.log(req.body)

//     // Save the review
//     const result = await Book.create(updatedReqBody)
//     // res.status(201).json({
//       success: true,
//       message: 'book created successfully',
//       data: result,
//     })

//     // Add the review to the book's reviews array
//     // await Book.findByIdAndUpdate(bookId, { $push: { reviews: newReview._id } })

//     res.status(201).json({ message: 'Review submitted successfully' })
//   } catch (error) {
//     console.error('Error submitting review:', error)
//     res.status(500).json({ message: 'Internal server error' })
//   }
// }

// export const reviewController = {
//   review,
// }

import { Review } from './reviewModel'
import { Book } from '../book/bookmodel'

// Route for submitting a review
const review = async (req, res) => {
  console.log(req.body)
  try {
    const { bookId, rating, reviewText } = req.body
    console.log(req.body.bookId)
    // Create a new review
    const newReview = await Review.create({ rating, reviewText })
    await Book.findByIdAndUpdate(bookId, {
      $push: { reviews: newReview._id },
    })
    const updatedBook = await Book.findById(bookId).populate('reviews')
    // console.log(updatedBook)

    res.status(201).json({
      success: true,
      message: 'review created successfully',
      data: updatedBook,
    })
  } catch (error) {
    console.error('Error creating book:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    })
  }
}

export const reviewController = {
  review,
}
