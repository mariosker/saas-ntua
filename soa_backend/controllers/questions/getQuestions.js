const { logger, createError } = require('../../loaders/common')

const { questionService } = require('../../loaders/services')

async function createQuestion (req, res, next) {
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
    logger.error(error)
    next(createError(500, 'Error getting questions', error))
  }
}

module.exports = createQuestion
