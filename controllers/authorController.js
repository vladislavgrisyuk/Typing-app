const comment = require('../models/article')
const _ = require('lodash')

const getAll = (req, res) => {
  comment.find({ authorId: req?.user?._id }).then((data) => {
    res.render('author-all', { data })
  })
}

const getProfile = (req, res) => {
  if (_.isEmpty(req?.user)) res.redirect('/register')
  else
    comment.findById(req.params.id).then((data) => {
      res.render('author-profile', { data })
    })
}

const getCreatePage = (req, res) => {
  if (_.isEmpty(req?.user)) res.redirect('/register')
  else res.render('author-create')
}

const postCreate = (req, res) => {
  if (_.isEmpty(req?.user)) res.redirect('/register')
  else
    comment
      .create({
        title: req.body.title,
        content: req.body.content,
        authorId: req?.user._id,
      })
      .then((obj) => console.log(obj))
      .catch((obj) => console.log(obj))
  res.redirect('/author')
}

module.exports = {
  getAll: getAll,
  getProfile: getProfile,
  getCreatePage: getCreatePage,
  postCreate: postCreate,
}
