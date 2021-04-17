const morgan = require('morgan')
const { http } = require('../utils/logger')

const stream = {
  write: (message) => http(message)
}

const skip = () => {
  const env = process.env.NODE_ENV || 'development'
  return env !== 'development'
}

// Build the morgan middleware
const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
)

module.exports = morganMiddleware
