const app = require('express')
const author = app.Router()
const authorController = require('../controllers/authorController')

author.get('/', authorController.getAll)
author.get('/create', authorController.getCreatePage)
author.get('/:id', authorController.getProfile)
author.post('/create', authorController.postCreate)
module.exports = author
