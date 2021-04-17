const { logger, createError, response } = require('../../loaders/common')
const UserService = require('../../services/User')
const userService = new UserService()

async function createUser (req, res, next) {
  const user = req.body
  try {
    const createdUser = await userService.createUser(user)
    res.send(createdUser)
    response()
  } catch (error) {
    logger.error('Create User: ', error)
    next(createError(500, 'Error creating user', error))
  }
}

module.exports = createUser
