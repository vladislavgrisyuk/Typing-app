const userController = require('../controllers/userController')
const jwt = require('jsonwebtoken')
const cfg = require('../config')

const userToken = {
  verify: async (req, res, next) => {
    try {
      const token = req.cookies.token
      const userVerify = jwt.verify(token, cfg.SECRET_JWT)
      const dbUser = await userController.getUserById(userVerify.userId)
      req.user = dbUser
      res.locals.user = req?.user
    } catch (e) {
      req.user = null
      res.locals.user = null
    } finally {
      next()
    }
  },

  sign: async (req, res, next) => {
    const { username, password } = req.body
    const userD = await userController.getUser({ username, password })
    console.log(userD)
    console.log(req.body)
    req.body.dbUser = userD
    if (userD.length) {
      res.cookie('token', jwt.sign({ userId: userD[0]._id }, cfg.SECRET_JWT))
    } else {
      //res.json({ message: 'user not found' })
    }

    next()
  },

  clear: async (req, res, next) => {
    delete res.locals.user
    res.clearCookie('token')
    next()
  },
}

module.exports = userToken
