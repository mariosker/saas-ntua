const express = require('express')
const https = require('https')
const fs = require('fs')
const path = require('path')
const logger = require('../utils/logger')

const morganMiddleware = require('../middleware/morganMiddleware')
const config = require('../config')

class AuthenticationServer {
  constructor () {
    if (!fs.existsSync(path.resolve(__dirname, '../certs/key.pem')) || !fs.existsSync(path.resolve(__dirname, '../certs/cert.pem'))) {
      logger.error('Cannot start without certifications')
    }

    const key = fs.readFileSync(path.resolve(__dirname, '../certs/key.pem'))
    const cert = fs.readFileSync(path.resolve(__dirname, '../certs/cert.pem'))

    const options = {
      key,
      cert
    }

    const app = express()

    // Log requests
    app.use(morganMiddleware)
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    // Pass app to routes
    const authRouter = require('../routes/authorization')
    app.use(authRouter)

    // error handler
    app.use(AuthenticationServer.errorHandler)

    this.server = https.createServer(options, app)
    this.server.listen(config.authServer.port, () => {
      logger.info(`Auth Server running, now listening on port ${config.authServer.port}`)
    })
  }

  get Server () {
    return this.server
  }

  static errorHandler (err, req, res, next) {
    const errorDetails = {
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
      stack: err.stack
    }

    if (config.env !== 'development') {
      if (errorDetails.status >= 500) {
        errorDetails.status = 500
        errorDetails.message = 'Internal Server Error'
      }
      delete errorDetails.stack
    }

    res.status(errorDetails.status).send(errorDetails)
  }

  async shutdown () {
    this.server.close()
  }
}

module.exports = AuthenticationServer
