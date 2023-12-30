import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, successLogger } from './shared/logger'

async function connectDb() {
  try {
    await mongoose.connect(config.db_url as string)

    successLogger.info('db successfull')

    app.listen(config.port, () => {
      successLogger.info(`app listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('db error', error)
  }
}

connectDb()
