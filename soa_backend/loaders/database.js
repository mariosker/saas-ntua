const { Sequelize } = require('sequelize')
const config = require('../config')
const logger = require('../utils/logger')

const User = require('../models/user.model')

class Database {
  async init () {
    Database.sequelize = new Sequelize(config.database.name,
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
    this.modelDefiners = [User]
    await this.addModels()
  }

  get Database () {
    return Database.sequelize
  }

  get Models () {
    logger.info('models', this.modelDefiners)
    return this.modelDefiners
  }

  async getStatus () {
    try {
      await Database.sequelize.authenticate()
      logger.info('Database connection has been established successfully.')
      return { ok: true }
    } catch (error) {
      logger.error('Unable to connect to the database:', error)
      return { ok: false }
    }
  }

  async addModels () {
    for (const modelDefiner of this.modelDefiners) {
      modelDefiner(Database.sequelize)
    }
    await Database.sequelize.sync({ force: false })
  }
}

module.exports = Database
