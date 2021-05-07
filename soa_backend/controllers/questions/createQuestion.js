const { logger, createError } = require('../../loaders/common')

const QuestionService = require('../../services/Question')
const questionService = new QuestionService()

const HashtagService = require('../../services/Hashtag')
const hashtagService = new HashtagService()

async function createQuestion (req, res, next) {
  const question = req.body
  try {
    if (question.hashtags !== undefined) {
      const hashtags = await hashtagService.create(question.hashtags)
      question.hashtags = hashtags
    }
    const createdQuestion = await questionService.create(question)
    res.send(createdQuestion)
  } catch (error) {
    logger.error(error)
    next(createError(500, 'Error creating Question', error))
  }
}

module.exports = createQuestion
