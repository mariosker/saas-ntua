const { logger, sequelize, createError, Joi } = require('../loaders/common')
const hashtagModel = sequelize.models.Hashtag

async function aux (value) {
  const returnValues = []

  for (const h of value) {
    try {
      const rv = await hashtagModel.findOrCreate({ where: { hashtag: h } })
      returnValues.push(rv[0])
    } catch (err) {
      logger.error(err)
    }
  }
  return returnValues
}

class Hashtag {
  async create (data) {
    const { error, value } = Joi.array().items(Joi.string().trim().min(1)).required().validate(data)
    logger.info('Hashtags are valid')
    if (error) {
      logger.error('Hashtags are not valid')
      createError(500, error)
    }
    if (!value?.length) return null
    const hashtagRes = await aux(value)
    return hashtagRes
  }
}

module.exports = Hashtag
