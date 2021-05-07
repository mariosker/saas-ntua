const { logger, sequelize, createError, Joi } = require('../loaders/common')
const questionModel = sequelize.models.Question
const userModel = sequelize.models.User

const questionSchema = Joi.object({
  UserId: Joi.required(),
  title: Joi.string().min(1).required(),
  body: Joi.string().min(1).required(),
  hashtags: Joi.array()
})

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

        if (value.hashtags !== undefined || value.hashtags.length !== 0) {
          await value.hashtags.forEach(h => {
            logger.info(h)
            returnValue.addHashtag(h)
          })
        }

        returnValue = returnValue.dataValues
        console.debug(returnValue)
      })
    } catch (err) {
      logger.error('Create question not working', err)
      throw createError(500, 'Cannot create question')
    }
    return returnValue
  }
}

module.exports = Question
