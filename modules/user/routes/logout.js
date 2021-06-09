const sendMessage = require("../../../util/flashMessage");

const  route = async (req,res) => {
	req.session.destroy( async () => {
		res.redirect("/")
	});

}

module.exports = route;