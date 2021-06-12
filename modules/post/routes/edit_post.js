const sendMessage = require("../../../util/flashMessage");
const Post = require("../model");
const path = require("path");


const route = async (req,res) => {
	const {body, params, files} = req;
	let { id } = params;
	let post_image = files.post_image;
	post_image.mv(path.resolve(__dirname, "../../../public/img/postimages", post_image.name))
	let _post = await Post.find();
	if(!_post)
		return req.session.message = await sendMessage("alert alert-danger","There are error on post or category");
	const _post_update = await Post.findOneAndUpdate({ _id: id },{
		title: body.title,
		content: body.content,
		category: body.category,
		post_image: `/img/postimages/${post_image.name}`
	},{new: true});
	await _post_update.save();
	return res.redirect(`/admin/posts`)
};

module.exports = route;