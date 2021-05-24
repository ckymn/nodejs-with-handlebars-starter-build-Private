const mongoose = require("mongoose");
const env = require("./index");

const connectDB = async() => {
	try {
		const connect = await mongoose.connect(env("MONGO_URI"), {
			useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
		})
		console.log(`MongoDB connected name : ${connect.connection.name}`)
	} catch (error) {
		console.error(error);
		process.exit(1);// kill program
	}
}

module.exports =  connectDB;