const comment = require('../models/comment');
const _ = require('lodash');

const author_all = (req, res) => {
	comment.find({ authorId: req?.user?._id }).then(objs => {
		res.render('author-all', (data = objs));
	});
};

const author_profile = (req, res) => {
	if (_.isEmpty(req?.user)) res.redirect('/register');
	else
		comment.findById(req.params.id).then(objs => {
			res.render('author-profile', (data = objs));
		});
};

const author_create = (req, res) => {
	if (_.isEmpty(req?.user)) res.redirect('/register');
	else res.render('author-create');
};

const author_create_post = (req, res) => {
	if (_.isEmpty(req?.user)) res.redirect('/register');
	else
		comment
			.create({
				title: req.body.title,
				content: req.body.content,
				authorId: req?.user._id,
			})
			.then(obj => console.log(obj))
			.catch(obj => console.log(obj));
	res.redirect('/author');
};

module.exports = {
	author_all,
	author_profile,
	author_create,
	author_create_post,
};
