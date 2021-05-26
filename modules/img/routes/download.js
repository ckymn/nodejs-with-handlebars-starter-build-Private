const Img = require("../model");
const get_bucked = require("../../../storage");
const path = require("path");

const route = async (req,res) => {
	let { body, params, query } = req;
	const _img = await Img.findById(params.id);
	res.setHeader("Content-Type", "image/jpeg");
	if(!_img)
		return res.status(404).render("blog");
	const bucket = await get_bucked();
	try {
		const file = bucket.file(params.id);
		const _exists = (await file.exists())[0];
		console.log("exists : ", _exists);
		if(_exists)
			return file.createReadStream().pipe(res);
	} catch (error) {
		console.error("Img_upload_foultt : ", error);
	}
	return res.status(404).render("blog", {img:_exists});
};

module.exports = route;