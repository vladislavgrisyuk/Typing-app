const mongoose = require('mongoose')
const schema = mongoose.Schema

const articleSch = new schema(
  {
    authorId: {
      type: schema.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const article = mongoose.model('Article', articleSch)
module.exports = article
