const axios = require('axios')
const faker = require('faker')
const fs = require('fs')
const config = require('../config')

const Questions = require('./Question')
const questions = new Questions()

const User = require('./User')
const user = new User()

const picker = require('./picker')

class Answer {
  async createAnswer (data, QuestionId, UserId) {
    try {
      const result = await axios.post(config.answersURL + '/questions/' + QuestionId + '/' + UserId + '/answers', data)
      console.log(result)
      return result.data
    } catch (err) {
      return undefined
    }
  }

  async createAnswers (k) {
    Answer.answerData = []
    for (let index = 0; index < k; index++) {
      try {
        const pickedUser = picker(user.users, 1)[0].id
        const pickedQuestion = picker(questions.questions, 1)[0].id
        const answerData = {
          answer: faker.lorem.lines(1)
        }
        const res = await this.createAnswer(answerData, pickedQuestion, pickedUser)
        console.log(pickedUser, pickedQuestion)
        if (res !== undefined) { Answer.answerData.push(res) }
      } catch (err) {
        console.log(err)
      }
    }
    const data = JSON.stringify(Answer.answerData)
    await fs.writeFileSync('answers.json', data)
    return Answer.answerData
  }

  get answers () {
    return Answer.answerData
  }
}

module.exports = Answer
