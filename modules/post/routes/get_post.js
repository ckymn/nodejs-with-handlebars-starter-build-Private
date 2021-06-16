const Post = require("../model");
const Img = require("../../img/model");
const Category = require("../../admin/model");
const Users = require("../../user/model");

const route = async (req, res) => {
  const { body, params } = req;
  let _id = params.id; 
  let _post = await Post.findById(_id).populate({ path: "author", model: Users});
  let _posts = await Post.find({}).populate({ path: "author", model: Users}).sort({createdAt: -1});
  console.log(_posts);
	let _category = await Category.find().sort({createdAt: -1});
  if(!_post)
	  return res.status(404).render("blog_single");
  return res.render("blog_single",{ post: _post, category: _category, posts: _posts});
};

module.exports = route;
