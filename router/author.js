const app = require('express');
const author = app.Router();
const authorController = require('../controllers/author-controller');

author.get('/', authorController.author_all);
author.get('/create', authorController.author_create);
author.get('/:id', authorController.author_profile);
author.post('/create', authorController.author_create_post);
module.exports = author;
