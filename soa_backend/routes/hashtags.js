const express = require('express')
const router = express.Router()

const getPopularHashtags = require('../controllers/hashtags/getPopularHashtags')
router.get('/get_popular', getPopularHashtags)

module.exports = router
