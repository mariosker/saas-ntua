const { DBPORT, PORT, NODE_ENV } = process.env

const config = {
  development: {
    database: {
      host: 'localhost',
      name: 'database',
      username: 'postgres',
      password: 'postgres',
      port: DBPORT || 5432
    },
    server: { port: PORT || 3000 },
    authServer: { port: PORT || 4000 },
    env: 'development',
    ACCESS_TOKEN_SECRET: '',
    REFRESH_TOKEN_SECRET: ''

  },
  production: {
    database: {
      host: 'localhost',
      name: 'database',
      username: 'postgres',
      password: 'postgres',
      port: DBPORT || 5432
    },
    server: { port: PORT || 3000 },
    authServer: { port: PORT || 4000 },
    env: 'production',
    ACCESS_TOKEN_SECRET: '',
    REFRESH_TOKEN_SECRET: ''

  }
}

const nodeEnv = NODE_ENV || 'development'
if (!['development', 'production'].includes(nodeEnv)) {
  throw new Error('Environment not matching development or production')
}

module.exports = config[nodeEnv]
