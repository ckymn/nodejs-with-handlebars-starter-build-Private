const {Token,Pass} = require("../util/auth");
const User = require("../modules/user/model");
const message = require("../util/flashMessage");

const require_auth = async (req, res, next) => {
  const { body, query } = req;
  let auth = req.session.token
  if (!auth){
    req.session.sessionFlash = message[2];
  	return res.render("login")
  } 
  let {_id} = Token.decode(auth);
  if (!_id){
    req.session.sessionFlash = message[3];
  	return res.render("register");
  }
  const _client = await User.findById(_id);
  if (!_client) 
  	return res.status(401).send("not_logged_in4")
  next();
};


module.exports = require_auth