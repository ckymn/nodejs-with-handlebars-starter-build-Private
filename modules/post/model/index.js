const { Mongoose, Schema, model} = require("mongoose");

const postSchema = new model("post", new Schema({
	title : { type: Schema.Types.String, require: true },
	content : { type: Schema.Types.String, require: true},
	post_image : { type: Schema.Types.String, require: true},
	category: { type: Schema.Types.ObjectId, ref: "categories" }
},
	{ timestamps: true}
));

module.exports = postSchema;
