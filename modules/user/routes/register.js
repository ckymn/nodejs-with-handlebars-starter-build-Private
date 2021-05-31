const User = require("../model");
const {Pass,Token} = require("../../../util/auth")
const sendMessage = require("../../../util/flashMessage");

const route = async( req, res ) => {
	const { body, params } = req;
	let { username, password, email } = body;
	const hash = await Pass.hash(password);
	const dub_email = await User.findOne({ email });
	if(dub_email){
		req.session.sessionFlash = sendMessage("alert alert-danger","Have Already email . You Should Other Email or You should Login")
		return res.status(400).redirect("/auth/register");
	}
	const _user = new User({
		username,
		email,
		password: hash
	});		
	await _user.save();
	req.session.sessionFlash = sendMessage("alert alert-success","SignUp Success")
	return res.redirect("/auth/login");
}

module.exports = route;