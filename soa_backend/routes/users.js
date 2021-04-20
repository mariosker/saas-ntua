const express = require('express')
const router = express.Router()

const createUser = require('../controllers/users/createUser')
router.post('', createUser)

const login = require('../controllers/users/login')
router.post('/login', login)

module.exports = router
