const { Schema, Mongoose, model } = require("mongoose");

const img = new model("img", new Schema({
	name: { type: Schema.Types.String, default:"" }, 
	original_name: { type: Schema.Types.String, default:"" },
	thumbnail: { type: Schema.Types.String, default: '' },
    mime_type: { type: Schema.Types.String, default: `` },
    active: { type: Schema.Types.Boolean, default: true },
    alt: { type: Schema.Types.String, default: '' },
    width: { type: Schema.Types.Number, default: 0 },
    height: { type: Schema.Types.Number, default: 0 },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }));

module.exports = img;