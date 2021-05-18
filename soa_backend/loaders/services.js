const QuestionService = require('../services/Question')
const questionService = new QuestionService()

const UserService = require('../services/User')
const userService = new UserService()

const HashtagService = require('../services/Hashtag')
const hashtagService = new HashtagService()

exports.questionService = questionService
exports.userService = userService
exports.hashtagService = hashtagService
