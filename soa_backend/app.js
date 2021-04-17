const ExpressServer = require('./loaders/express')
const Database = require('./loaders/database')

async function app () {
  const db = new Database()
  await db.init()

  const status = await db.getStatus()
  if (status.ok !== true) {
    process.exit(1)
  }

  const server = new ExpressServer()

  async function shutDown () {
    await db.Database.close()
    await server.shutdown()
  }

  process.on('SIGTERM', shutDown)
  process.on('SIGINT', shutDown)
  process.on('exit', shutDown)
}

app()
