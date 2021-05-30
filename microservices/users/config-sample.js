const { DBPORT, PORT, NODE_ENV } = process.env

const config = {
  development: {
    database: {
      host: 'localhost',
      name: 'users',
      username: 'postgres',
      password: 'postgres',
      port: DBPORT || 5432
    },
    server: { port: PORT || 3000 },
    env: 'development',
    ACCESS_TOKEN_SECRET: '',
    REFRESH_TOKEN_SECRET: '',
    saltRounds: 5
  },
  production: {
    database: {
      host: 'localhost',
      name: 'users',
      username: 'postgres',
      password: 'postgres',
      port: DBPORT || 5432
    },
    server: { port: PORT || 3000 },
    env: 'production',
    ACCESS_TOKEN_SECRET: '',
    REFRESH_TOKEN_SECRET: '',
    saltRounds: 5
  }
}

const nodeEnv = NODE_ENV || 'development'
if (!['development', 'production'].includes(nodeEnv)) {
  throw new Error('Environment not matching development or production')
}

module.exports = config[nodeEnv]
