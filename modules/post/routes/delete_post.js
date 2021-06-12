const sendMessage = require("../../../util/flashMessage");
const Post = require("../model");

const route = async (req,res) => {
	const {body, params} = req;
	let { id } = params;
	const _delete = await Post.findOneAndDelete({ _id: id });
	if(!_delete)
		return req.session.message = await sendMessage("alert alert-danger","Cannot remove post");
	req.session.message = await sendMessage("alert alert-success","Success deleting Post");
	return res.redirect("/admin/posts");
};

module.exports = route;