const { PORT, NODE_ENV } = process.env

const config = {
  development: {
    server: { port: PORT || 3000 },
    env: 'development'
  },
  production: {
    server: { port: PORT || 3000 },
    env: 'production'
  }
}

const nodeEnv = NODE_ENV || 'development'
if (!['development', 'production'].includes(nodeEnv)) {
  throw new Error('Environment not matching development or production')
}

module.exports = config[nodeEnv]
