const jwt = require('jsonwebtoken')

class JWT {
  static sign (payload, secret, options = null) {
    return jwt.sign(payload, secret, options)
  }
}

module.exports = JWT
