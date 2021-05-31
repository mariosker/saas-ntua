const express = require('express')
const createError = require('http-errors')
const router = express.Router()

const QuestionService = require('./components/questionService')
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

async function getPopularHashtags (req, res, next) {
  const date = req.params.from
  try {
    console.log('in')
    const result = await questionService.getPopularHashtags(date)
    res.send(result[0])
  } catch (error) {
    console.log(error)
    next(createError(500, 'Error counting questions', error))
  }
}

router.get('/hashtags/get_popular', getPopularHashtags)

async function getQuestions (req, res, next) {
  const { page = 1, limit = 10 } = req.query
  try {
    const { count, questions } = await questionService.getQuestions(page, limit)
    console.log(questions)
    res.send({
      questions,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    })
  } catch (error) {
    console.log(error)
    next(createError(500, 'Error getting questions', error))
  }
}
router.get('/questions', getQuestions)

async function countQuestionsByDate (req, res, next) {
  const date = req.params.from
  try {
    const count = await questionService.countByDate(date)
    res.send({ count })
  } catch (error) {
    console.log(error)
    next(createError(500, 'Error counting questions', error))
  }
}

router.get('/questions/count/:from', countQuestionsByDate)

module.exports = router
