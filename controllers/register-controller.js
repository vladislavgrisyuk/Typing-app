const { check, validationResult } = require('express-validator')
const userController = require('./userController')

const registerController = {
  registerIndex: async (req, res) => {
    console.log('INDEX')
    res.render('register/signup')
  },
  registerSignup: [
    check('username', 'Username field is required').notEmpty(),
    check('password', 'Password field is required').notEmpty(),
    check('repeat-password', 'Repeat-password field is required').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        console.log('errors')
        res.render('register/signup', errors)
      } else {
        userController.createUser(req.body.username, req.body.password)
        res.redirect('/register')
      }
    },
  ],
}

module.exports = registerController
