const { logger, createError } = require('../../loaders/common')
const { hashtagService } = require('../../loaders/services')

async function getPopularHashtags (req, res, next) {
  const date = req.params.from
  try {
    const result = await hashtagService.getPopularHashtags(date)
    res.send(result[0])
  } catch (error) {
    logger.error(error)
    next(createError(500, 'Error counting questions', error))
  }
}

module.exports = getPopularHashtags
