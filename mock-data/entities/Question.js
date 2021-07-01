const axios = require('axios')
const faker = require('faker')
const fs = require('fs')
const config = require('../config')
const Hashtags = require('./Hashtags')
const hashtags = new Hashtags()

const User = require('./User')
const user = new User()

const picker = require('./picker')

class Question {
  async createQuestion (data) {
    try {
      const result = await axios.post(config.questionsURL + '/questions/', data)
      console.log(result)
      return result.data
    } catch (err) {
      return undefined
    }
  }

  async createQuestions (k) {
    Question.questions = []
    for (let index = 0; index < k; index++) {
      try {
        const pickedUser = picker(user.users, 1)[0].id
        const questionData = {
          title: faker.lorem.lines(1),
          body: faker.lorem.paragraph(),
          UserId: pickedUser,
          hashtags: hashtags.pickRandom(3)
        }
        const res = await this.createQuestion(questionData)
        if (res !== undefined) { Question.questions.push(res) }
      } catch (err) {
        console.log(err)
      }
    }
    const data = JSON.stringify(Question.questions)
    await fs.writeFileSync('questions.json', data)
    return Question.questions
  }

  get questions () {
    return Question.questions
  }
}

module.exports = Question
