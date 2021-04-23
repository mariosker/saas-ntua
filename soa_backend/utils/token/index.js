const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../../config')

class JWT {
  static generateRefreshToken (payload, options = null) {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, options)
  }

  static generateAccessToken (payload, options = { expiresIn: 2000 }) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, options)
  }

  static verifyRefreshToken (token, callback = null) {
    let user = null
    jwt.verify(token, REFRESH_TOKEN_SECRET, (err, result) => {
      if (callback != null) callback(err, result)

      if (err) return null
      user = result
    })

    return user
  }

  static verifyAccessToken (token, callback = null) {
    let user = null
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, result) => {
      if (callback != null) callback(err, result)

      if (err) return null
      user = result
    })

    return user
  }
}

module.exports = JWT
