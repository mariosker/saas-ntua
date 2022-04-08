const amqp = require('amqplib/callback_api')
const QuestionService = require('./questionService')
const questionService = new QuestionService()
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

  checkQuestionId () {
    amqp.connect('amqp://localhost', function (error0, connection) {
      if (error0) {
        throw error0
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1
        }
        const queue = 'AnswerQueue'

        channel.assertQueue(queue, {
          durable: false
        })
        channel.prefetch(1)

        channel.consume(queue, function reply (msg) {
          console.log(msg)
          const id = parseInt(msg.content.toString())
          let ret

          console.log(id)
          questionService.getQuestion(id).then((ret) => {
            console.log('QUESTION:', ret)
            const sret = JSON.stringify(ret)
            channel.sendToQueue(msg.properties.replyTo,
              Buffer.from(sret), {
                correlationId: msg.properties.correlationId
              })

            channel.ack(msg)
          })
            .catch((err) => {
              console.log(err)
              ret = JSON.stringify(false)
              console.log('QUESTION:', ret)
              channel.sendToQueue(msg.properties.replyTo,
                Buffer.from(ret), {
                  correlationId: msg.properties.correlationId
                })

              channel.ack(msg)
            })
        })
      })
    })
  }

  getAnswer (id, fn) {
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
              console.log(msg.content.toString())
              fn(JSON.parse(msg.content.toString()))
              setTimeout(function () {
                connection.close()
              }, 500)
            }
          }, {
            noAck: true
          })
          channel.sendToQueue('AnswerQueue',
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
