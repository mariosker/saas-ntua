const express = require('express')
const router = express.Router()

const createQuestion = require('../controllers/questions/createQuestion')
router.post('', createQuestion)

module.exports = router
