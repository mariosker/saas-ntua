const Joi = require('joi')
const createError = require('http-errors')
const { sequelize } = require('../index')
const answerModel = sequelize.models.Answer

const answerSchema = Joi.object({
  answer: Joi.string().min(3).required(),
  UserId: Joi.required(),
  QuestionId: Joi.required()
})

class AnswerService {
  validateAnswer (UserId, QuestionId, answer) {
    answer.QuestionId = QuestionId
    answer.UserId = UserId
    const { error, value } = answerSchema.validate(answer)
    if (error) {
      console.log('Answer not valid', error)
      throw createError(400, `Answer not valid: ${error.message}`)
    }
    return value
  }

  async answerQuestion (answer) {
    let returnValue
    try {
      await sequelize.transaction(async (t) => {
        returnValue = await answerModel.create(answer, {
          transaction: t
        })
        console.debug(returnValue)
      })
    } catch (err) {
      console.log('Create answer not working', err)
      throw createError(500, 'Cannot create answer')
    }
    return returnValue
  }

  async getAnswers (id) {
    let answer
    try {
      answer = await answerModel.findAll({ attributes: ['answer', 'UserId'], where: { QuestionId: id } })
    } catch (error) {
      throw createError(500, `Cannot get Question with id: ${id}`)
    }
    if (answer === null) {
      throw createError(500, `Question with id: ${id} doesn't exist`)
    }
    return answer
  }
}

module.exports = AnswerService
