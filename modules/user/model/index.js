const { Schema, Mongoose, model } = require("mongoose");

const users = new model("user", new Schema({
	username: { type: Schema.Types.String, require: true},
	email: { type: Schema.Types.String, require: true , unique: true},
	password: { type: Schema.Types.String, require: true }
}));

module.exports = users;