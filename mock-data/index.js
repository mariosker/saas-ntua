process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const User = require('./entities/User')
const user = new User()

const Question = require('./entities/Question')
const question = new Question()

const Answer = require('./entities/Answer')
const answer = new Answer()

async function main () {
  console.log('Users')
  await user.createUsers(500)
  console.log('Questions')
  await question.createQuestions(300)
  console.log('Answers')
  await answer.createAnswers(150)
}

main()
