const Category = require("../model");
const sendMessage = require("../../../util/flashMessage");

const route = async (req,res) => {
	const _admin = await Category.find({}).sort({createdAt: -1});
	if(!_admin){
		return res.status(404).render("admin/categories");
	};
	return res.render("admin/categories",{ admin: _admin,});
};

module.exports = route;