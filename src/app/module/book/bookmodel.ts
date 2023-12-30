import mongoose, { Schema, Types } from 'mongoose'

// Define the book interface
type BookDocument = mongoose.Document & {
  title: string
  author: string
  genre: string
  publicationDate: string
  img: string
  isbn: string
  language: string
  publisher: string
  pages: number
  summary: string
  reviews: Types.ObjectId[] | Review[]
}

// Define the book schema using the interface
const bookSchema = new Schema<BookDocument>({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  author: { type: String, required: [true, 'Author is required'], trim: true },
  genre: { type: String, required: [true, 'Genre is required'], trim: true },
  publicationDate: {
    type: String,
    required: [true, 'Publication date is required'],
  },
  img: { type: String, required: [true, 'Image URL is required'], trim: true },
  isbn: { type: String, required: [true, 'ISBN is required'], trim: true },
  language: {
    type: String,
    required: [true, 'Language is required'],
    trim: true,
  },
  publisher: {
    type: String,
    required: [true, 'Publisher is required'],
    trim: true,
  },
  pages: { type: Number, required: [true, 'Number of pages is required'] },
  summary: {
    type: String,
    required: [true, 'Summary is required'],
    trim: true,
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
})

// Create the Mongoose model, specifying the interface for type safety
export const Book = mongoose.model<BookDocument>('Book', bookSchema)
