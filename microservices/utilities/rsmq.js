const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const RedisSMQ = require('rsmq')
const rsmq = new RedisSMQ({ host: '127.0.0.1', port: 6379, ns: 'rsmq', realtime: true })
rsmq.createQueue({ qname: 'checkuser' }, function (err, resp) {
  if (err) {
    console.error(err)
    return
  }

  if (resp === 1) {
    console.log('queue created')
  }
})

async function attr () {
  while (true) {
    await sleep(1000)
    console.clear()
    rsmq.getQueueAttributes({ qname: 'myqueue' }, function (err, resp) {
      if (err) {
        console.error(err)
        return
      }

      console.log('==============================================')
      console.log('=================Queue Stats==================')
      console.log('==============================================')
      console.log('visibility timeout: ', resp.vt)
      console.log('delay for new messages: ', resp.delay)
      console.log('max size in bytes: ', resp.maxsize)
      console.log('total received messages: ', resp.totalrecv)
      console.log('total sent messages: ', resp.totalsent)
      console.log('created: ', resp.created)
      console.log('last modified: ', resp.modified)
      console.log('current n of messages: ', resp.msgs)
      console.log('hidden messages: ', resp.hiddenmsgs)
    })
  }
}

attr()
