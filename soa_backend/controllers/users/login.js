const { logger, createError } = require('../../loaders/common')
const JWT = require('../../utils/token')

const UserService = require('../../services/User')
const userService = new UserService()

async function login (req, res, next) {
  const user = req.body
  try {
    const response = await userService.login(user)
    const token = JWT.generateRefreshToken({ data: response }, {
      expiresIn: '90 days'
    })

    res.send({ token: token })
  } catch (error) {
    logger.error(error)
    next(createError(500, 'Error on Login', error))
  }
}

module.exports = login
