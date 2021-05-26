const User = require("../model");
const {Pass,Token} = require("../../../util/auth")

const route = async( req, res ) => {
	const { body, params } = req;
	let { username, password, email } = body;
	let password = await Pass.hash(password);
	let _user = new User({
		username,
		password,
		email
	});
	if(!_user)	
		return res.status(401).render("register");
	await _user.save();
	return res.redirect("/auth/login");
}

module.exports = route;