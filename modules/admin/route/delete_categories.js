const Category = require("../model");
const sendMessage = require("../../../util/flashMessage");

const route = async (req,res) => {
	const { body, params } =req;
	let { id } = params;
	const _delete = await Category.findOneAndDelete({_id: id});
	if(!_delete)
		return res.status(400).redirect("/admin/categories");
	req.session.message = await sendMessage("alert alert-warning","Category Deleted")
	return res.redirect("/admin/categories");
};

module.exports = route;