const axios = require('axios')
const faker = require('faker')
const fs = require('fs')
const config = require('../config')
class User {
  async createUser ({ username, email, password }) {
    try {
      const result = await axios.post(config.userURL +'/users/', {
        username: username,
        email: email,
        password: password
      })
      return result.data
    } catch (err) {
      return undefined
    }
  }

  async createUsers (k) {
    User.newUsers = []
    for (let index = 0; index < k; index++) {
      try {
        const userData = {
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password()
        }
        const res = await this.createUser(userData)
        if (res !== undefined) { User.newUsers.push(res) }
      } catch (err) {
        console.log(err)
      }
    }
    const data = JSON.stringify(User.newUsers)
    await fs.writeFileSync('users.json', data)
    return User.newUsers
  }

  get users () {
    return User.newUsers
  }
}

module.exports = User
