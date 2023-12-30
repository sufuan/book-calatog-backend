// import mongoose from 'mongoose'

// const reviewSchema = new mongoose.Schema({
//   //   bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
//   rating: { type: Number, required: true },
//   reviewText: { type: String, required: true },
// })

// export const Review = mongoose.model('Review', reviewSchema)

// module.exports = Review

import mongoose, { Schema, Types } from 'mongoose'

// type ReviewDocument = mongoose.Document & {
//   // ... review model fields ...
// }

const reviewSchema = new Schema({
  rating: { type: String, required: true },
  reviewText: { type: String, required: true },
})

export const Review = mongoose.model('Review', reviewSchema)
