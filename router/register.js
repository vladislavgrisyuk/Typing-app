const express = require('express')
const router = express.Router()
const registerController = require('../controllers/registerController')

router.get('/', (req, res) => {
  console.log('req.user: ' + req?.user)
  res.render('register/index', { user: req?.user })
})

router.post('/', registerController.singin)

router.get('/signup', registerController.index)

router.post('/signup', registerController.singup)

router.get('/logout', registerController.logout)

module.exports = router
