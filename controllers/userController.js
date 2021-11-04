const user = require('../models/user')

const userController = {
  createUser: async (username, password) => {
    if (await user.create({ username, password })) {
      return true
    } else {
      return false
    }
  },
  getUser: async (obj) => {
    return await user.find(obj)
  },

  getUserById: async (id) => {
    return await user.findById(id)
  },
}

module.exports = userController
