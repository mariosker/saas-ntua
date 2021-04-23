const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const { logger, sequelize, config, createError } = require('../loaders/common')
const validator = require('validator')
const userModel = sequelize.models.User

function isUserValid (user) {
  const errorMsg = (errMsg) => {
    return { message: errMsg, status: 400, isValid: false }
  }

  const err = {
    status: 200,
    message: '',
    isValid: true
  }

  if (typeof user.username === 'undefined') { return errorMsg('Username not included in request') }
  if (typeof user.password === 'undefined') { return errorMsg('Password not included in request') }
  if (typeof user.email === 'undefined') { return errorMsg('Email not included in request') }

  if (!validator.isLength(user.username, { min: 0, max: undefined })) {
    return errorMsg('Username not valid')
  }
  if (!validator.isStrongPassword(user.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 })) {
    return errorMsg('Password not valid')
  }
  if (!validator.isEmail(user.email)) {
    return errorMsg('Email not valid')
  }
  return err
}

class User {
  async createUser (user) {
    const isValid = isUserValid(user)
    if (!isValid.isValid) {
      throw createError(isValid.status, isValid.message)
    }

    let hash
    let returnUser

    try {
      const salt = await bcrypt.genSalt(config.saltRounds)
      hash = await bcrypt.hash(user.password, salt)
      user.password = hash
    } catch (err) {
      logger.err('Cannot hash password', err)
      throw createError(500, 'Cannot hash password')
    }

    try {
      await sequelize.transaction(async (t) => {
        const createdUser = await userModel.create(user, { transaction: t })
        delete createdUser.dataValues.password
        returnUser = createdUser.dataValues
        delete createdUser.password
        return createdUser.dataValues
      })
    } catch (err) {
      logger.error('Create user not working', err)
      throw createError(400, 'Cannot create user')
    }

    return returnUser
  }

  async login (user) {
    let returnUser = null

    try {
      await sequelize.transaction(async (t) => {
        const selectedUser = await userModel.findOne({
          where: {
            [Op.or]:
              {
                username: user.username,
                email: user.username
              }

          }
        })

        if (selectedUser == null) {
          throw createError(403, 'Not existing user')
        }

        const matched = await bcrypt.compare(user.password, selectedUser.dataValues.password)

        if (matched === false) throw createError(403, 'Invalid Credentials')

        returnUser = selectedUser.dataValues
        delete returnUser.password

        return returnUser
      })
    } catch (err) {
      logger.error('Login Error', err)
      throw err
    }
    return returnUser
  }
}

module.exports = User
