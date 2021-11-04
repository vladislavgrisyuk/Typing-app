const { check, body, validationResult } = require('express-validator')
const userController = require('./userController')
const userToken = require('../middlewares/userToken')
const _ = require('lodash')

const registerController = {
  index: async (req, res) => {
    res.render('register/signup')
  },
  singin: [
    userToken.sign,
    (req, res) => {
      if (req.body.dbUser) {
        res.redirect('/author/create')
      } else {
        //TODO: Change to beauty logic
        res.json({ message: 'user not found' })
      }
    },
  ],
  singup: [
    //Basic validation chain
    check('username', 'Username field is required!').notEmpty(),
    check('password', 'Password field is required!').notEmpty(),
    check('repeat-password', 'Repeat-password field is required!').notEmpty(),
    body('username').custom(async (val) => {
      const user = await userController.getUser({ username: val })

      //Check if user already exists
      if (user && !_.isEmpty(user)) {
        throw new Error('User already exists!')
      }
      return true
    }),
    //check for `password` and `repeat password` are the same
    body('password').custom((val, { req }) => {
      console.log('val: ' + val + ' req: ' + req.body['repeat-password'])
      if (val !== req.body['repeat-password']) {
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
  logout: [
    userToken.clear,
    (req, res) => {
      res.redirect('/')
    },
  ],
}

module.exports = registerController
