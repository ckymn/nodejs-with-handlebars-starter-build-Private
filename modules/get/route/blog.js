const Post = require("../../post/model");
const Category = require("../../admin/model");
const Users = require("../../user/model");

const route = async(req,res) => {
	const { body, params} = req;
	let _post = await Post.find().populate({ path: "author",model: Users}).sort({createdAt: -1});
	let _category = await Category.find().sort({createdAt: -1});
	if(!_post)
		return res.status(404).render("addpost");
	return res.render("blog", {posts: _post, category: _category});
}

module.exports = route;