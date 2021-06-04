const sendMessage = require("../../../util/flashMessage");

const  route = async (req,res) => {
	req.session.destroy( async () => {
		req.session.message = await sendMessage("alert alert-success","Exit Successful")
		res.redirect("/")
	});

}

module.exports = route;