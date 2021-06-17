const Post = require("../model");
const Img = require("../../img/model");
const Category = require("../../admin/model");
const Users = require("../../user/model");

const route = async (req, res) => {
  const { body, params } = req;
  let _id = params.id; 
  let _post = await Post.findById(_id).populate({ path: "author", model: Users});
  let _posts = await Post.find({}).populate({ path: "author", model: Users}).sort({createdAt: -1});
	let _category = await Category.aggregate([
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "category",
        as: "posts"
      }
    },
    {
      $project: {
        id: 1,
        name: 1,
        num_of_posts: { $size : "$posts" }
      }
    }
  ]);
  if(!_post)
	  return res.status(404).render("blog_single");
  return res.render("blog_single",{ post: _post, category: _category, posts: _posts});
};

module.exports = route;
