const user = require('../models/user')

const userController = {
  createUser: async (username, password) => {
    if (await user.create({ username, password })) {
      return true
    } else {
      return false
    }
  },
  getUser: async (username) => {
    return await user.find({ username })
  },
}

module.exports = userController
