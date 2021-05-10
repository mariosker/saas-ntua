const { logger, sequelize, createError, Joi } = require('../loaders/common')
const questionModel = sequelize.models.Question
const userModel = sequelize.models.User

const questionSchema = Joi.object({
  UserId: Joi.required(),
  title: Joi.string().min(1).required(),
  body: Joi.string().min(1).required(),
  hashtags: Joi.array()
})

const associateSchema = Joi.object({
  hashtags: Joi.array()
}).unknown(true)

class Question {
  async create (question) {
    const { error, value } = questionSchema.validate(question)
    
    if (error) {
      logger.error('Question not valid', error)
      throw createError(400, 'Question not valid: {error.message}')
    }

    let returnValue
    try {
      await sequelize.transaction(async (t) => {
        returnValue = await questionModel.create(value, {
          transaction: t,
          include: [userModel]
        })
        returnValue = returnValue.dataValues
        throw createError(500, 'Cannot create question')
    }
    return returnValue
  }

  async associateHashtags (data, question) {
    const { error, value } = associateSchema.validate(data)
    if (error) {
      logger.error('Question not valid', error)
      throw createError(400, 'Question not valid: {error.message}')
    }
    try {
      if (value.hashtags?.length) {
        for (const h of value.hashtags) {
          try {
            await question.addHashtag(h)
          } catch (error) {
            logger.error(error)
            throw createError(500, 'Cannot associate hashtags')
          }
        }
      }
      question.dataValues.hashtags = value.hashtags
      return question
    } catch (err) {
      logger.error('Create question not working', err)
      throw createError(500, 'Cannot create question')
    }
  }
}

module.exports = Question
