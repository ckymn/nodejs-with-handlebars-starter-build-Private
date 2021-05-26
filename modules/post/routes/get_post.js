const Post = require("../model");
const Img = require("../../img/model");


const route = async (req, res) => {
  const { body, params } = req;
  let _id = params.id; 
  let _post = await Post.findById(_id);
  if(!_post)
	return res.status(404).render("post");
  return res.render("post",{ post: _post});
};

module.exports = route;
