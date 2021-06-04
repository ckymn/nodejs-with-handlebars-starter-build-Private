const Category = require("../model");
const sendMessage = require("../../../util/flashMessage")

const route = async (req,res) => {
	const { body, params } = req;
	const _admin = await new Category(body);
	if(!_admin){
		return res.status(400).redirect("/admin/categories")
	}
	const _save = await _admin.save();
	if(!_save){
		req.session.message = await sendMessage("alert alert-danger","There is a fault in save method!");
		return res.status(500).redirect("/amdin/categories");
	}
	req.session.message = await sendMessage("alert alert-success","Successfuly saved categoriy in database")
	return res.redirect("/admin/categories");
};

module.exports = route;
