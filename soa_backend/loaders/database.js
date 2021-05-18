const { Sequelize } = require('sequelize')
const config = require('../config')
const logger = require('../utils/logger')

const User = require('../models/user.model')
const Question = require('../models/question.model')
const Hashtag = require('../models/hashtag.model')
const Answer = require('../models/answer.model')
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
    this.modelDefiners = [User, Question, Hashtag, Answer]
    await this.addModels()
  }

  get Database () {
    return Database.sequelize
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
    const models = Database.sequelize.models

    models.User.hasMany(models.Question)
    models.Question.belongsTo(models.User)

    models.User.hasMany(models.Answer)
    models.Answer.belongsTo(models.User)

    models.Question.hasMany(models.Answer)
    models.Answer.belongsTo(models.Question)

    models.Question.belongsToMany(models.Hashtag, { through: 'question_hashtag' })
    models.Hashtag.belongsToMany(models.Question, { through: 'question_hashtag' })

    await Database.sequelize.sync({ force: true })
  }
}

module.exports = Database
