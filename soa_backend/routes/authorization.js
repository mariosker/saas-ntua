const express = require('express')

const router = express.Router()

router.get('/token', (req, res) => {
  console.log(req)
})

const login = require('../controllers/users/login')
router.post('/users/login', login)

module.exports = router
