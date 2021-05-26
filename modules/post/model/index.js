const { Mongoose, Schema, model} = require("mongoose");

const postSchema = new model("post", new Schema({
	title : { type: Schema.Types.String, require: true },
	content : { type: Schema.Types.String, require: true},
	post_image : { type: Schema.Types.String, require: true},
},
	{ timestamps: true}
));

module.exports = postSchema;
