const ExpressServer = require('./loaders/express')
const Database = require('./loaders/database')
const AuthenticationServer = require('./loaders/auth_server')

async function app () {
  const db = new Database()
  await db.init()

  const status = await db.getStatus()
  if (status.ok !== true) {
    process.exit(1)
  }

  const server = new ExpressServer()
  const authServer = new AuthenticationServer()

  async function shutDown () {
    await db.Database.close()
    await server.shutdown()
    await authServer.shutdown()
  }

  process.on('SIGTERM', shutDown)
  process.on('SIGINT', shutDown)
  process.on('exit', shutDown)
}

app()
