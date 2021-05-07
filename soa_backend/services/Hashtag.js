const { logger, sequelize, createError, Joi } = require('../loaders/common')
const hashtagModel = sequelize.models.Hashtag

// I could substitute the function with Model.findOrCreate()
// but for some reason it doesn't work
async function findOrCreateHashtag (hashtagString) {
  let hashtag
  hashtag = await hashtagModel.findOne({ where: { hashtag: hashtagString } })
  if (hashtag === null || hashtag === undefined) {
    console.log('creating')
    hashtag = await hashtagModel.create({ hashtag: hashtagString })
  }
  return hashtag
}

async function aux (value) {
  const returnValues = []
  await value.forEach(
    async h => {
      const rv = await findOrCreateHashtag(h)
      returnValues.push(rv)
    }
  )
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
    if (value === undefined || value.length === 0) return null
    const hashtagRes = await aux(value)
    return hashtagRes
  }
}

module.exports = Hashtag
