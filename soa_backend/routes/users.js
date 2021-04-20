const express = require('express')
const router = express.Router()

const createUser = require('../controllers/users/createUser')
router.post('', createUser)

module.exports = router
