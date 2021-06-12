const sendMessage = require("../../../util/flashMessage");
const Post = require("../model");
const Category = require("../../admin/model");

const route = async (req,res) => {
	const {body, params} = req;
	let { id } = params;
	const _post = await Post.findOne({ _id: id });
	const _category = await Category.find();
	if(!_post || !_category)
		return req.session.message = await sendMessage("alert alert-danger","There are error on post or category");
	return res.render(`admin/edits`, {post: _post, category: _category});
};

module.exports = route;