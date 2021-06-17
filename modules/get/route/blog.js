const Post = require("../../post/model");
const Category = require("../../admin/model");
const Users = require("../../user/model");

const route = async(req,res) => {
	const { body, params} = req;
	let _post = await Post.find().populate({ path: "author",model: Users}).sort({createdAt: -1});
	let _category = await Category.aggregate([
		{
			$lookup:{
				from: "posts",
				localField: "_id",
				foreignField: "category",
				as: "posts"
			},
		},
		{
			$project:{
				_id: 1,
				name: 1,
				num_of_posts: { $size: "$posts" }
			}
		}
	]);	
	console.log(_category);
	if(!_post)
		return res.status(404).render("addpost");
	return res.render("blog", {posts: _post, category: _category});
}

module.exports = route;