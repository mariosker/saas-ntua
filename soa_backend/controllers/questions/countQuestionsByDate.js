const { logger, createError } = require('../../loaders/common')
const { questionService } = require('../../loaders/services')

async function countQuestionsByDate (req, res, next) {
  const date = req.params.from
  try {
    const count = await questionService.countByDate(date)
    res.send({ count })
  } catch (error) {
    logger.error(error)
    next(createError(500, 'Error counting questions', error))
  }
}

module.exports = countQuestionsByDate
