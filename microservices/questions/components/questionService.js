const Joi = require('joi')
const createError = require('http-errors')
const { sequelize } = require('../index')
const questionModel = sequelize.models.Question
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const moment = require('moment')

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

  async getQuestion (id) {
    let question
    try {
      question = await questionModel.findByPk(id)
    } catch (error) {
      throw createError(500, `Cannot get Question with id: ${id}`)
    }
    if (question === null) {
      throw createError(500, `Question with id: ${id} doesn't exist`)
    }
    return question
  }

  async getQuestions (page, limit) {
    try {
      const { count, rows } = await questionModel.findAndCountAll({ offset: (page - 1) * limit, limit: limit, include: [userModel, hashtagModel], distinct: true })
      console.log('count', count)
      console.log(rows)
      return { count: count, questions: rows }
    } catch (error) {
      console.log('Cannot get questions', error)
      throw createError(500, 'Cannot get questions')
    }
  }

  async countByDate (date) {
    const parsedDate = moment(date)
    if (!(isNaN(date) && !isNaN(parsedDate))) {
      console.log('Date not valid')
      throw createError('Date not valid')
    }
    try {
      const refDate = moment(date)
      const count = await questionModel.count({ where: { createdAt: { [Op.gte]: refDate } } })
      return count
    } catch (error) {
      console.log('Cannot count questions by date', error)
      throw createError(500, 'Cannot count questions by date')
    }
  }

  async getPopularHashtags (date) {
    const parsedDate = moment(date)
    if (!(isNaN(date) && !isNaN(parsedDate))) {
      console.log('Date not valid')
      throw createError('Date not valid')
    }
    try {
      const records = await sequelize.query(
      `select ccd.hashtag, count(ccd.hashtag) as hashtag_count from
      (SELECT id, title, body, "UserId", unnest(hashtags) as hashtag, "createdAt", "updatedAt" FROM public."Questions"
      where "createdAt" >= :some_date::date) ccd
      group by ccd.hashtag
      order by hashtag_count desc`
      , {
        replacements: { some_date: parsedDate.format('YYYY-MM-DD HH:mm:ss') }
      })
      console.log(records)
      return records
    } catch (err) {
      console.log('Cannot find hashtags', err)
      throw createError(500, 'Cannot find hashtags')
    }
  }
}

module.exports = QuestionService
