const { logger, sequelize, createError, Joi } = require('../loaders/common')
const questionModel = sequelize.models.Question
const userModel = sequelize.models.User
const answerModel = sequelize.models.Answer

const questionSchema = Joi.object({
  UserId: Joi.required(),
  title: Joi.string().min(1).required(),
  body: Joi.string().min(1).required(),
  hashtags: Joi.array()
})

const associateSchema = Joi.object({
  hashtags: Joi.array()
}).unknown(true)

const answerSchema = Joi.object({
  answer: Joi.string().min(3).required()
})

class Question {
  async create (question) {
    const { error, value } = questionSchema.validate(question)

    if (error) {
      logger.error('Question not valid', error)
      throw createError(400, `Question not valid: ${error.message}`)
    }

    let returnValue
    try {
      await sequelize.transaction(async (t) => {
        returnValue = await questionModel.create(value, {
          transaction: t,
          include: [userModel]
        })

        console.debug(returnValue)
      })
    } catch (err) {
      logger.error('Create question not working', err)
      throw createError(500, 'Cannot create question')
    }
    return returnValue
  }

  async associateHashtags (data, question) {
    const { error, value } = associateSchema.validate(data)
    if (error) {
      logger.error('Question not valid', error)
      throw createError(400, `Question not valid: ${error.message}`)
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

  async getQuestion (id) {
    let question
    try {
      question = await questionModel.findByPk(id)
    } catch (error) {
      logger.error('Error finding question by id', error)
      throw createError(500, `Cannot get question with id: ${id}`)
    }
    if (question === null) {
      logger.info('Cannot find question')
      throw createError(500, `Question with id: ${id} doesn't exist`)
    }
    return question
  }

  async answerQuestion (user, question, answer) {
    const { error, value } = answerSchema.validate(answer)
    if (error) {
      logger.error('Answer not valid', error)
      throw createError(400, `Answer not valid: ${error.message}`)
    }

    let returnValue
    try {
      await sequelize.transaction(async (t) => {
        value.UserId = user.dataValues.id
        value.QuestionId = question.dataValues.id
        returnValue = await answerModel.create(value, {
          transaction: t, include: [userModel, questionModel]
        })
        console.debug(returnValue)
        // await user.addAnswer(returnValue)
        // await question.addAnswer(returnValue)
      })
    } catch (err) {
      logger.error('Create answer not working', err)
      throw createError(500, 'Cannot create answer')
    }
    return returnValue
  }
}
module.exports = Question
