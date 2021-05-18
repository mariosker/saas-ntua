const { logger, createError } = require('../../loaders/common')

const { userService, questionService } = require('../../loaders/services')

async function createQuestion (req, res, next) {
  const answer = req.body
  const questionId = req.params.question_id
  const userId = req.params.user_id
  try {
    const question = questionService.getQuestion(questionId)
    const user = userService.getUser(userId)

    const retAnswer = await questionService.answerQuestion(await user, await question, answer)
    res.send(retAnswer.dataValues)
  } catch (error) {
    logger.error(error)
    next(createError(500, 'Error creating Answer', error))
  }
}

module.exports = createQuestion
