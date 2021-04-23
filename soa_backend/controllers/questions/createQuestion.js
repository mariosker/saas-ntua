const { logger, createError } = require('../../loaders/common')

const QuestionService = require('../../services/Question')
const questionService = new QuestionService()

async function createQuestion (req, res, next) {
  const question = req.body
  try {
    const createdQuestion = await questionService.create(question)
    res.send(createdQuestion)
  } catch (error) {
    logger.error(error)
    next(createError(500, 'Error creating Question', error))
  }
}

module.exports = createQuestion
