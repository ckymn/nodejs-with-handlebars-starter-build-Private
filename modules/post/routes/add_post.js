const Post = require("../model");
const path = require("path");

const route = async(req,res) => {
	const { body, parms ,files} = req;

	let post_image = files.post_image;
	if(!post_image)
		return res.status(404).send("not_found_post_image")
	post_image.mv(path.resolve(__dirname, "../../../public/img/postimages", post_image.name))
	const _post = await new Post({ 
		...body, 
		post_image:`/img/postimages/${post_image.name}`
	});
	if(!_post)
		return res.status(404).send("post_not_found");
	await _post.save();
	return res.redirect("/blog");
};

module.exports = route;

