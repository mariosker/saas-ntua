const { sequelize } = require('../index')
// const Sequelize = require('sequelize')
const questionModel = sequelize.models.Question
const Joi = require('joi')
const createError = require('http-errors')
// const Op = Sequelize.Op
// const moment = require('moment')

const questionSchema = Joi.object({
  UserId: Joi.required(),
  title: Joi.string().min(1).required(),
  body: Joi.string().min(1).required(),
  hashtags: Joi.array().items(Joi.string().trim().min(1).optional()).optional()
})

class QuestionService {
  validateQuestion (question) {
    const { error, value } = questionSchema.validate(question)
    if (error) {
      console.log('Question not valid', error)
      throw createError(400, `Question not valid: ${error.message}`)
    }
    return value
  }

  async create (value) {
    let returnValue
    try {
      await sequelize.transaction(async (t) => {
        returnValue = await questionModel.create(value, {
          transaction: t
        })
        console.debug(returnValue)
      })
    } catch (err) {
      console.log('Create question not working', err)
      throw createError(500, 'Cannot create question')
    }
    return (returnValue)
  }
}

module.exports = QuestionService
