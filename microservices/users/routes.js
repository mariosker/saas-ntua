const express = require('express')
const createError = require('http-errors')
const router = express.Router()

const UserService = require('./components/userService')
const userService = new UserService()

async function createUser (req, res, next) {
  const user = req.body
  try {
    const createdUser = await userService.createUser(user)
    res.send(createdUser)
  } catch (error) {
    console.log(error)
    next(createError(500, 'Error creating user', error))
  }
}

router.post('/users', createUser)

module.exports = router
