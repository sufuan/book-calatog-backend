/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Book } from './bookmodel'
import { Request, Response, NextFunction } from 'express'

const createBook = async (req: Request, res: Response) => {
  const pages = req.body.pages ? parseInt(req.body.pages, 10) : undefined

  console.log(pages)
  // Update the req.body with the converted "pages" value
  const updatedReqBody = {
    ...req.body,
    pages,
  }

  try {
    const result = await Book.create(updatedReqBody)
    res.status(201).json({
      success: true,
      message: 'book created successfully',
      data: result,
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

// get all books

const getallbooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract query parameters
    const {
      page = 1,
      limit = 10,
      sortBy,
      sortOrder = 'asc',
      minPrice,
      maxPrice,
      location,
      searchTerm,
    } = req.query

    // Build filter object based on query parameters
    const filters: any = {}

    if (minPrice) filters.price = { $gte: parseInt(minPrice as string, 10) }
    if (maxPrice)
      filters.price = {
        ...filters.price,
        $lte: parseInt(maxPrice as string, 10),
      }
    if (location) filters.location = location
    if (searchTerm) {
      filters.$or = [
        { location: new RegExp(searchTerm, 'i') },
        { breed: new RegExp(searchTerm, 'i') },
        { category: new RegExp(searchTerm, 'i') },
      ]
    }

    // Create the sort object based on provided sortBy and sortOrder
    const sort: any = {}
    if (sortBy && sortOrder) {
      sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1
    }

    // Fetch book from the database with pagination and sorting
    const result = await Book.find(filters)
      .sort(sort)
      .skip((parseInt(page as string, 10) - 1) * parseInt(limit as string, 10))
      .limit(parseInt(limit as string, 10))

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Book retrieved successfully',
      meta: {
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
      },
      data: result,
    })
  } catch (error) {
    console.error('Error retrieving book:', error)
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
      data: null,
    })
  }
}

// get single book by id

const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bookid = req.params.id
  try {
    const book = await Book.findById(bookid).populate('reviews')

    if (!book) {
      res.status(404).json({
        success: false,
        message: 'book not found',
        data: null,
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'bbok retrieved successfully',
      data: book,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    })
  }
}

// update book by id

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookid = req.params.id // Assuming the user ID is in the route parameter
  const updatebookdata = req.body
  console.log(updatebookdata)
  console.log(bookid)

  try {
    const updatebook = await Book.findByIdAndUpdate(bookid, updatebookdata, {
      new: true,
    })

    if (!updatebook) {
      res.status(404).json({
        success: false,
        message: 'book not found',
        data: null,
      })
      return
    }
    console.log('updatebook')
    res.status(200).json({
      success: true,
      message: 'book updated successfully',
      data: updatebook,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    })
  }
}

// // delete book by id

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookid = req.params.id

  try {
    const deletedbook = await Book.findByIdAndDelete(bookid)

    if (!deletedbook) {
      res.status(404).json({
        success: false,
        message: 'book not found',
        data: null,
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'book deleted successfully',
      data: deletedbook,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    })
  }
}

export const bookController = {
  createBook,
  getallbooks,
  getSingleBook,
  updateBook,
  deleteBook,
}
