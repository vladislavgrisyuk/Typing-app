const user = require('../models/user')

const userController = {
  createUser: (username, password) => {
    if (user.create({ username, password })) {
      return true
    } else {
      return false
    }
  },
}

module.exports = userController
