const express = require('express')
const router = express.Router()
const user = require('../models/user')
const jwt = require('jsonwebtoken')
const registerController = require('../controllers/registerController')

router.get('/', (req, res) => {
  console.log('req.user: ' + req?.user)
  res.render('register/index', { user: req?.user })
})

router.post('/', async (req, res) => {
  const { username, password } = req.body
  const userD = await user.find({ username, password })
  console.log(userD)
  console.log(req.body)
  if (userD.length) {
    res.cookie('token', jwt.sign({ userId: userD[0]._id }, '1'))
    res.redirect('/author/create')
  } else {
    res.json({ message: 'user not found' })
  }
})

router.get('/signup', registerController.registerIndex)

router.post('/signup', registerController.registerSignup)

router.get('/logout', async (req, res) => {
  delete res.locals.user
  res.clearCookie('token')
  res.redirect('/')
})

module.exports = router
