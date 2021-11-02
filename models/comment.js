const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSch = new schema(
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
);

const comment = mongoose.model('Comment', commentSch);
module.exports = comment;
