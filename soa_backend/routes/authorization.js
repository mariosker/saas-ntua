const express = require('express')

const router = express.Router()

const generateAccessToken = require('../controllers/auth')
router.post('/token', generateAccessToken)

const login = require('../controllers/users/login')
router.post('/users/login', login)

module.exports = router
