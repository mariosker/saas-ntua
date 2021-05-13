const { logger, createError } = require('../../loaders/common')
const { hashtagService, questionService } = require('../../loaders/services')

async function createQuestion (req, res, next) {
  const question = req.body
  try {
    const createdQuestion = await questionService.create(question)

    if (question.hashtags !== undefined) {
      const hashtags = await hashtagService.create(question.hashtags)
      console.log('controller', hashtags)
      question.hashtags = hashtags
    }
    await questionService.associateHashtags(question, createdQuestion)
    res.send(createdQuestion.dataValues)
  } catch (error) {
    logger.error(error)
    next(createError(500, 'Error creating Question', error))
  }
}

module.exports = createQuestion
