const  route = async (req,res) => {
	res.session.destroy(() => {
		res.redirect("/")
	});

}

module.exports = route;