const JWT = require('../../utils/token')
const axios = require('axios')
const qs = require('qs')

function authenticateToken (req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN
  if (token == null) return res.sendStatus(401)

  const data = qs.stringify({ token: token })
  axios.post('https://localhost:4000/token', data).then(token =>
    JWT.verifyAccessToken(token, (err, result) => {
      if (err) return res.sendStatus(401)
      next()
    })

  )
}

module.exports = authenticateToken
