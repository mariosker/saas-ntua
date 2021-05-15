const express = require('express')

const router = express.Router()

const users = require('./users')
router.use('/users', users)

router.use('/test', (req, res) => {
  res.send({ ok: 'ok' })
})

module.exports = router
