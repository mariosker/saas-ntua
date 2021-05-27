const axios = require('axios')
const faker = require('faker')
const fs = require('fs')
const getRandom = require('./entities/picker')

const User = require('./entities/User')
const user = new User()

// const Question = require('./entities/Question')
// const question = new Question()

const Hashtags = require('./entities/Hashtags')
const hashtags = new Hashtags()

exports.axios = axios
exports.faker = faker
exports.fs = fs
exports.user = user
// question = question
exports.hashtags = hashtags
exports.getRandom = getRandom
