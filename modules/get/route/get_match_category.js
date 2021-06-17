const Post = require("../../post/model");
const Category = require("../../admin/model");
const sendMessage = require("../../../util/flashMessage");

const router = async (req, res) => {
  const { params, body } = req;
  const { id } = params;
  const _posts = await Post.find({ category: id }).populate({ path: "category", model: Category});
  console.log(_posts); 
  const _category = await Category.aggregate([
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
			  _id: 1,
			  name: 1,
			  num_of_posts: { $size: "$posts" }
		  }
	  }
  ]);
  console.log(_category)
  if (!_posts && !_category){ 
  	req.session.message = await sendMessage("alert alert-danger", "Couldn't go to this category!");
	return res.status(404).redirect("/blog");
  }
  return res.render("blog", { posts: _posts , category: _category })
};

module.exports = router;
