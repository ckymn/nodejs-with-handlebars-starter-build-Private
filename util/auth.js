const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Token = {};
const Pass = {};

Token.encode = (object) => {
	let {sign="non_prod_key"} = process.env;
	return jwt.sign(object,sign);
};

Token.decode = (token) => {
	try {
		let {sign="non_prod_key"} = process.env;
		const decode = jwt.verify(token, sign);
		if(decode._id == null)
			return false;
		return decode;	
	} catch (error) {
		return false;
	}
};

Pass.hash = async (password) => {
	return await bcrypt.hash(password, 10);
};

Pass.match = async (password, hash) => {
	try {
		const match = await bcrypt.compare(password, hash);
		return match;
	} catch (error) {
		return false;
	}
};

module.exports  = { Pass, Token };