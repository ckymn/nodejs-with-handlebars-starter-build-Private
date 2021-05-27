const  route = async (req,res) => {
	req.session.destroy(() => {
		res.redirect("/")
	});

}

module.exports = route;