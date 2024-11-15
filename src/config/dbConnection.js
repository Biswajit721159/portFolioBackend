const mongoose = require("mongoose");
const connection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log(`\nMongoDB connected`);
	} catch (error) {
		console.log("MONGODB connection FAILED ", error?.message);
		process.exit(1);
	}
};
module.exports = {
	connection,
};
