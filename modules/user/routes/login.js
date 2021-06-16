const User = require("../model");
const { Token, Pass } = require("../../../util/auth");
const joi = require("../../../util/joi");
const sendMessage = require("../../../util/flashMessage");

const schema = joi.object({
	email: joi.string().email().allow(null, ""),
	username: joi.string().alphanum().min(3).max(30).required(),
	password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
}).optional({ stripUnknown: true });


const route = async( req, res ) => {
	let { params, body } = req;
	const { email, password , username} = body;
	const _profile = await User.findOne({ $or: [{ username}, { email }]});
	if(!_profile){
		req.session.message= await sendMessage("alert alert-danger","You Have To SignUp")
		return res.status(401).redirect("/auth/register");
	}
	let match = await Pass.match(password, _profile.password);
	if(!match){
		req.session.message= await sendMessage("alert alert-danger","Password or Email Incorrect !")
		return res.status(401).redirect("/auth/login");
	}
	let acces_token = await Token.encode({_id: _profile._id, type:"admin"});
	req.session.token = acces_token;
	return res.redirect("/");
}

module.exports = { route, schema};