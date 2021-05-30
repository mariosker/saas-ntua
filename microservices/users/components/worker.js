const amqp = require('amqplib/callback_api')
const UserService = require('./userService')
const userService = new UserService()
class MessageReceiver {
  constructor () {
    const self = this
    amqp.connect('amqp://localhost', function (error0, connection) {
      if (error0) {
        throw error0
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1
        }
        self.checkUserId(channel)
      })
    })
  }

  checkUserId (channel) {
    function replacer (key, value) {
      if (key === 'password') return undefined
      return value
    }
    const queue = 'userIdQueue'

    channel.assertQueue(queue, {
      durable: false
    })
    channel.prefetch(1)

    channel.consume(queue, function reply (msg) {
      console.log(msg)
      const id = parseInt(msg.content.toString())
      let ret

      console.log(id)
      userService.getUser(id).then((ret) => {
        console.log('USER:', ret)
        const sret = JSON.stringify(ret, replacer)
        channel.sendToQueue(msg.properties.replyTo,
          Buffer.from(sret), {
            correlationId: msg.properties.correlationId
          })

        channel.ack(msg)
      })
        .catch((err) => {
          console.log(err)
          ret = JSON.stringify(false)
          console.log('USER:', ret)
          channel.sendToQueue(msg.properties.replyTo,
            Buffer.from(ret), {
              correlationId: msg.properties.correlationId
            })

          channel.ack(msg)
        })
    })
  }
}

module.exports = MessageReceiver
