const express = require('express');
const mongoose = require('mongoose');

const session = require('express-session');
const comment = require('./models/comment');
const author_router = require('./router/author');
const register_router = require('./router/register');
const typingRouter = require('./router/typing');
const userC = require('./models/user');
const path = require('path');

const cookie_parser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();

mongoose
	.connect(
		'mongodb+srv://admin:admin@cluster0.btmlr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
		{ useNewUrlParser: true }
	)
	.then(db => console.log('Connected to ' + db.connections[0].name))
	.catch(err => console.log(err));

app.listen(3000, () => {
	console.log('Server is listening on port 3000!');
});

const verifyUser = async (req, res, next) => {
	try {
		// if (req.cookies.token && req.cookies.token != 'undefined') {
		// 	next();
		// 	return;
		// }

		const token = req.cookies.token;
		const user = jwt.verify(token, '1');

		const userF = await userC.findById(user.userId);
		req.user = userF;
		res.locals.user = req?.user;
		next();
	} catch (e) {
		req.user = {};
		res.locals.user = {};
		next();
	}
};

app.set('view engine', 'ejs');
app.use(cookie_parser());
app.use(express.urlencoded({ extended: true }));
app.use(verifyUser);
app.use('/author', author_router);
app.use('/register', register_router);
app.use('/typing', typingRouter);
app.use(express.static('public'));

app.get('/', (req, res) => {
	//res.cookie('token', undefined);
	res.redirect('/author');
});
