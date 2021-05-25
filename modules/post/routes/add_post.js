const Post = require("../model");

const route = async(req,res) => {
	const { body, parms } = req;

	const _post = await new Post(body);
	if(!_post)
		return res.status(404).send("post_not_found");
	await _post.save();
	return res.render("blog");
};

module.exports = route;