class Response {
  constructor ({ errorStatus = 0, message = 'Success', payload = null, httpCode = 200 }) {
    this.errorStatus = errorStatus
    this.message = message
    this.payload = payload
    this.httpCode = httpCode
  }

  get Response () {
    return {
      errorStatus: this.errorStatus,
      message: this.message,
      payload: this.payload,
      httpCode: this.httpCode
    }
  }
}

module.exports = Response
