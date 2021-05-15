const JWT = require('../utils/token')
const qs = require('qs')
const fetch = require('node-fetch')

require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create()

function authenticateToken (req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN
  if (token == null) return res.sendStatus(401)

  // const data = qs.stringify()
  fetch('https://localhost:4000/token', { token: token }).then(accessToken => {
    console.log(accessToken)
  })

  next()
}

module.exports = authenticateToken
