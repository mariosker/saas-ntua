const { logger, createError } = require('../../loaders/common')

const UserService = require('../../services/User')
const userService = new UserService()

async function login (req, res, next) {
  const user = req.body
  try {
    const response = await userService.login(user)
    res.send(response)
  } catch (error) {
    logger.error(error)
    next(createError(500, 'Error creating user', error))
  }
}

module.exports = login
