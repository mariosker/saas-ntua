const express = require('express')
const router = express.Router()

const createQuestion = require('../controllers/questions/createQuestion')
router.post('', createQuestion)

const answerQuestion = require('../controllers/questions/answerQuestion')
router.post('/:question_id/:user_id/answers', answerQuestion)

const getQuestions = require('../controllers/questions/getQuestions')
router.get('/', getQuestions)

module.exports = router
