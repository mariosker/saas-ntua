const express = require('express')
const createError = require('http-errors')
const router = express.Router()

const QuestionService = require('./components/answerService')
const questionService = new QuestionService()

const Bus = require('./components/worker')
const bus = new Bus()

async function answerQuestion (req, res, next) {
  const answer = req.body
  const questionId = req.params.question_id
  const userId = req.params.user_id
  let validAnswer
  try {
    validAnswer = questionService.validateAnswer(userId, questionId, answer)
  } catch (error) {
    console.log(error)
    next(createError(500, 'Error creating Answer- Invalid json', error))
  }

  function checkUserIdWrapper (userId) {
    return new Promise((resolve, reject) => {
      bus.checkUserId(userId, (successResponce) => {
        if (successResponce === false) reject(new Error('no such user'))
        resolve(successResponce)
      })
    })
  }
  function checkQuestionIdWrapper (questionId) {
    return new Promise((resolve, reject) => {
      bus.checkUserId(questionId, (successResponce) => {
        if (successResponce === false) reject(new Error('no such question'))
        resolve(successResponce)
      })
    })
  }

  Promise.all([checkUserIdWrapper(userId), checkQuestionIdWrapper(questionId)]).then(async () => {
    try {
      const retAnswer = await questionService.answerQuestion(validAnswer)
      res.send(retAnswer.dataValues)
    } catch (error) {
      console.log(error)
      next(createError(500, 'Error creating Answer', error))
    }
  }).catch(error => {
    console.error(error.message)
    return next(createError(500, 'Wrong Data'))
  })
}

router.post('/questions/:question_id/:user_id/answers', answerQuestion)

module.exports = router
