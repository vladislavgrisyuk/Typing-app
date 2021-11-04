const express = require('express')
const mongoose = require('mongoose')
const author_router = require('./router/author')
const register_router = require('./router/register')
const typingRouter = require('./router/typing')
const cookie_parser = require('cookie-parser')
const userToken = require('./middlewares/userToken')
const app = express()
const cfg = require('./config')

mongoose
  .connect(cfg.DB_URL, { useNewUrlParser: true })
  .then((db) => {
    console.log('Connected to ' + db.connections[0].name)
    app.listen(3000, () => {
      console.log('Server is listening on port 3000!')
    })
  })
  .catch((err) => console.log(err))

app.set('view engine', 'ejs')
app.use(cookie_parser())
app.use(express.urlencoded({ extended: true }))
app.use(userToken.verify)
app.use('/author', author_router)
app.use('/register', register_router)
app.use('/typing', typingRouter)
app.use(express.static('public'))

app.get('/', (req, res) => {
  //res.cookie('token', undefined);
  res.redirect('/author')
})
