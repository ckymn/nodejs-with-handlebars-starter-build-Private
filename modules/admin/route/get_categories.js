const Category = require("../model");
const sendMessage = require("../../../util/flashMessage");

const route = async (req,res) => {
	const _admin = await Category.find({}).sort({createdAt: -1});
	if(!_admin){
		req.session.sessionFlash = sendMessage("alert alert-danger","Category Create Incorrect");
	};
	req.session.sessionFlash = sendMessage("alert alert-success","Category Create Successfully");
	return res.render("admin/categories",{ admin: _admin});
};

module.exports = route;