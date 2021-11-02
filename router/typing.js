const app = require('express');

const router = app.Router();

router.get('/', (req, res) => {
	res.render('typing/index');
});

module.exports = router;
