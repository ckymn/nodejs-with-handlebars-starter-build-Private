const { Schema , Mongoose , model } = require("mongoose");

const admin = new model('category', new Schema({
	name: { type: Schema.Types.String, require: true },
},
	{ timestamps: true }
));

module.exports = admin;