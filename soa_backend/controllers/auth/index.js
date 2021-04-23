const JWT = require('../../utils/token')

function generateAccessToken (req, res) {
  console.error(req.body)
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(403)

  JWT.verifyRefreshToken(refreshToken, (err, payload) => {
    if (err) return res.sendStatus(401)
    console.log(payload)
    const accessToken = JWT.generateAccessToken(payload.data)
    res.json({ accessToken: accessToken })
  })
}

module.exports = generateAccessToken
