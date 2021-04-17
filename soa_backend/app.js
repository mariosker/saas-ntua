const ExpressServer = require('./loaders/express')

async function app () {
  const server = new ExpressServer()

  async function shutDown () {
    await server.shutdown()
  }

  process.on('SIGTERM', shutDown)
  process.on('SIGINT', shutDown)
  process.on('exit', shutDown)
}

app()
