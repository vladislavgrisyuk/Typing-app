const { check, body, validationResult } = require('express-validator')
const userController = require('./userController')

const _ = require('lodash')

const registerController = {
  registerIndex: async (req, res) => {
    console.log('INDEX')
    res.render('register/signup')
  },
  registerSignup: [
    check('username', 'Username field is required!').notEmpty(),
    check('password', 'Password field is required!').notEmpty(),
    check('repeat-password', 'Repeat-password field is required!').notEmpty(),
    body('username').custom(async (val) => {
      const user = await userController.getUser(val)
      console.log(body('repeat-password'))
      if (user && !_.isEmpty(user)) {
        throw new Error('User already exists!')
      }
      return true
    }),
    body('password').custom((val, { req }) => {
      console.log('val: ' + val + ' req: ' + req.body['repeat-password'])
      if (val !== req.body['repeat-password']) {
        console.log('ASDASDASDASDASD')
        throw new Error('passwords must be equal!')
      }
      return true
    }),
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
