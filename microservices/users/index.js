const path = require('path')
const express = require('express')
const https = require('https')
const fs = require('fs')
const config = require('./config')
const { Sequelize } = require('sequelize')
const User = require('./components/user.model')
let sequelize

function errorHandler (err, req, res, next) {
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

function setServer () {
  const key = fs.readFileSync(path.resolve(__dirname, './certs/localhost-key.pem'))
  const cert = fs.readFileSync(path.resolve(__dirname, './certs/localhost.pem'))

  const options = {
    key,
    cert
  }

  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  const indexRouter = require('./routes')
  app.use(indexRouter)

  app.use(errorHandler)

  this.server = https.createServer(options, app)
  this.server.listen(config.server.port, () => {
    console.log(`User server running, now listening on port ${config.server.port}`)
  })
}

async function setDatabase () {
  sequelize = new Sequelize(config.database.name,
    config.database.username,
    config.database.password, {
      host: config.database.host,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })

  await sequelize.authenticate()
  console.log('Database connection has been established successfully.')

  const modelDefiners = [User]
  for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize)
  }

  await sequelize.sync()
}

(async () => {
  await setDatabase()
  setServer()
})()

module.exports.sequelize = sequelize
