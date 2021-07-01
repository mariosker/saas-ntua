const { USERURL, QUESTIONSURL, ANSWERSURL, NODE_ENV } = process.env

const config = {
  soa: {
    userURL: 'https://localhost:3000' || USERURL,
    questionsURL: 'https://localhost:3000' || QUESTIONSURL,
    answersURL: 'https://localhost:3000' || ANSWERSURL
  },
  microservices: {
    userURL: 'https://localhost:3001' || USERURL,
    questionsURL: 'https://localhost:3002' || QUESTIONSURL,
    answersURL: 'https://localhost:3003' || ANSWERSURL
  }
}

const nodeEnv = NODE_ENV || 'soa'
if (!['soa', 'microservices'].includes(nodeEnv)) {
  throw new Error('Environment not matching soa or microservices')
}

module.exports = config[nodeEnv]
