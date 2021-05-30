const express = require('express')
const createError = require('http-errors')
const router = express.Router()

const QuestionService = require('./components/newService')
const questionService = new QuestionService()

const Bus = require('./components/worker')
const bus = new Bus()

async function createQuestion (req, res, next) {
  const question = req.body
  try {
    const validQuestion = questionService.validateQuestion(question)
    bus.checkUserId(validQuestion.UserId, (user) => {
      if (user === false) {
        console.log('No such user')
        return next(createError(500, 'No such user'))
      }
      questionService.create(validQuestion)
      res.send(validQuestion)
    })
  } catch (error) {
    console.log(error)
    next(createError(500, 'Error creating question', error))
  }
}

router.post('/questions', createQuestion)

module.exports = router
