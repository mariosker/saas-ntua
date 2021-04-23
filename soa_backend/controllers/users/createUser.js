const { logger, createError } = require('../../loaders/common')
const JWT = require('../../utils/token')

const UserService = require('../../services/User')
const userService = new UserService()

async function createUser (req, res, next) {
  const user = req.body
  try {
    const createdUser = await userService.createUser(user)

    const token = JWT.generateRefreshToken({ data: createdUser }, { expiresIn: '90 days' })

    res.send({ token: token })
  } catch (error) {
    logger.error(error)
    next(createError(500, 'Error creating user', error))
  }
}

module.exports = createUser
