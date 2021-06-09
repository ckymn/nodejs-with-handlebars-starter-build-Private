const Post = require("../../post/model");
const Category = require("../../admin/model");
const Users = require("../../user/model");

const route = async (req, res) => {
	const { body, params} = req;
	let _post = await Post.find().
		populate({ path: "author",select: "username", model: Users}).
		populate({ path: "category",select: "name",model: Category}).
		sort({createdAt: -1});
	if(!_post)
		return res.status(404).render("addpost");
  	return res.render("admin/posts",{ posts: _post});
};
module.exports = route;
