const amqp = require('amqplib/callback_api')

class Bus {
  checkUserId (id, fn) {
    const self = this
    amqp.connect('amqp://localhost', function (error0, connection) {
      if (error0) {
        throw error0
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1
        }
        channel.assertQueue('', {
          exclusive: true
        }, function (error2, q) {
          if (error2) {
            throw error2
          }
          const correlationId = self.generateUuid()

          channel.consume(q.queue, function (msg) {
            if (msg.properties.correlationId === correlationId) {
              fn(JSON.parse(msg.content.toString()))
              setTimeout(function () {
                connection.close()
              }, 500)
            }
          }, {
            noAck: true
          })
          channel.sendToQueue('userIdQueue',
            Buffer.from(id.toString()), {
              correlationId: correlationId,
              replyTo: q.queue
            })
        })
      })
    })
  }

  generateUuid () {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString()
  }
}

module.exports = Bus
