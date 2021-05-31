const Category = require("../model");
const sendMessage = require("../../../util/flashMessage")

const route = async (req,res) => {
	const { body, params } = req;
	const _admin = await new Category(body);
	if(!_admin){
		req.session.sessionFlash = sendMessage("alert alert-danger","Category Create Incorrect");
		return res.status(400).redirect("/admin/categories")
	}
	req.session.sessionFlash = sendMessage("alert alert-success","Category Create Successfully");
	await _admin.save();
	return res.redirect("/admin/categories");
};

module.exports = route;
