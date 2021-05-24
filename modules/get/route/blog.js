const Post = require("../../post/model");

const route = async(req,res) => {
	const { body, params } = req;
	let _post = await Post.find().sort({createdAt: -1});
	console.log(_post);
	if(!_post)
		return res.status(404).send("post_not_found");
	return res.render("blog", {posts: _post});
}

module.exports = route;