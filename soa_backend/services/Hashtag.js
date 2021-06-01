const { logger, sequelize, createError, Joi } = require('../loaders/common')
const hashtagModel = sequelize.models.Hashtag
const moment = require('moment')
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

  async getPopularHashtags (date) {
    const parsedDate = moment(date)
    if (!(isNaN(date) && !isNaN(parsedDate))) {
      logger.error('Date not valid')
      throw createError('Date not valid')
    }
    try {
      const records = await sequelize.query(
      `select ha.hashtag, asoc.hashtag_count
      FROM (select question_hashtag."HashtagId" , COUNT(*) as hashtag_count
      FROM question_hashtag
      WHERE question_hashtag."createdAt" >= :some_date::date
      GROUP BY question_hashtag."HashtagId") as asoc, (select "Hashtags".id, "Hashtags".hashtag from "Hashtags") as ha
      WHERE ha.id = asoc."HashtagId"
      order by hashtag_count desc`
      , {
        replacements: { some_date: parsedDate.format('YYYY-MM-DD HH:mm:ss') }
      })
      console.log(records)
      return records
    } catch (err) {
      logger.error('Cannot find hashtags', err)
      throw createError(500, 'Cannot find hashtags')
    }
  }
}

module.exports = Hashtag
