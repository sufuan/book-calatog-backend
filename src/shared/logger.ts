import winston from 'winston'
import Path from 'path'

const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),

  transports: [
    new winston.transports.File({
      filename: Path.join(process.cwd(), 'logs', 'winston', 'error.log'),
      level: 'error',
    }),
    new winston.transports.Console(),
  ],
})

const successLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),

  transports: [
    new winston.transports.File({
      filename: Path.join(process.cwd(), 'logs', 'winston', 'success.log'),
      level: 'info',
    }),
    new winston.transports.Console(),
  ],
})

export { successLogger, errorLogger }
