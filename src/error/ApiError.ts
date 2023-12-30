class ApiError extends Error {
  statusCode: number
  status: string

  constructor(statusCode: number, message: string | undefined) {
    super(message)
    this.statusCode = statusCode
    this.status = statusCode >= 400 && statusCode < 500 ? 'failed' : 'error'

    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError
