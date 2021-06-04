const Category = require("../../admin/model");

const route = async(req,res) => {
	let _category = await Category.find().sort({createdAt: -1});
	res.render("addpost",{ category: _category});
};

module.exports = route;