const User = require("../model");
const {Pass,Token} = require("../../../util/auth")
const message = require("../../../util/flashMessage");

const route = async( req, res ) => {
	const { body, params } = req;
	let { username, password, email } = body;
	const hash = await Pass.hash(password);
	const dub_email = await User.findOne({ email });
	if(dub_email){
		req.session.sessionFlash = message[4]
		return res.status(400).redirect("/auth/register");
	}
	const _user = new User({
		username,
		email,
		password: hash
	});		
	await _user.save();
	req.session.sessionFlash = message[5]
	return res.redirect("/auth/login");
}

module.exports = route;