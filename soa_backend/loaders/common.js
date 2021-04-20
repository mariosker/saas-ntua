const Database = require('./database')
const logger = require('../utils/logger')
const config = require('../config')
const createError = require('http-errors')

const db = new Database()
const sequelize = db.Database

exports.sequelize = sequelize
exports.logger = logger
exports.config = config
exports.createError = createError
