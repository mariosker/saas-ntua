const express = require('express')

const router = express.Router()

const users = require('./users')
router.use('/users', users)

const questions = require('./questions')
router.use('/questions', questions)

module.exports = router
