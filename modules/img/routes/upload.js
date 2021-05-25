const Img = require("../model");
const path = require("path");
const get_bucked = require("../../../storage");
const fs = require("fs");
const sharp = require("sharp");

const route = async (req, res) => {
	const { body, params, query, file } = req;
	if(!file)
		return res.status(422).send("There are no files attached to the request");
	const { originalname: original_name, filename: name, mimetype: mime_type } = file;
	const absolute = path.resolve(__dirname, "../../../", "./temp");
	const file_path = path.resolve(absolute, name);
	const resize_path = path.resolve(absolute, `${name}_resize`);
	let _img = new Img();
	let resized = await sharp(file.path).resize({
		height: 512,
		width: 512,
		fit: `inside`
	}).toFile(resize_path);
	await (await get_bucked()).upload(resize_path, { destination: _img.id + ``});
	await _img.save();
	clean_up(file_path);
	clean_up(resize_path);
	return res.send(_img)

};

let clean_up = async(path) => {
	return new Promise((resolve) => {
		fs.unlink(path, () => {
			resolve(true)
		})
	})
};

module.exports = route;