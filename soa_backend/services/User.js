const bcrypt = require('bcrypt')
const { logger, sequelize, config, createError, response } = require('../loaders/common')

console.log(sequelize.models)
const userModel = sequelize.models.User

class User {
  async createUser (user) {
    let hash
    try {
      const salt = await bcrypt.genSalt(config.saltRounds)
      hash = await bcrypt.hash(user.password, salt)
      user.password = hash
    } catch (err) {
      logger.err('Cannot hash password', err)
      throw new Error('Cannot hash password', err)
    }

    try {
      const createdUser = userModel.create(user)
      delete createdUser.password
      return createdUser
    } catch (err) {
      logger.error('Create user not working', err)
      throw new Error('Cannot create user into database', err)
    }
  }
}

module.exports = User
