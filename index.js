const express = require("express");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
let cors = require("cors");
const { connection } = require("./src/config/dbConnection");

dotenv.config();
app.use(
	cors({
		origin: "*",
		methods: "GET, POST, PUT, DELETE, PATCH",
		allowedHeaders: "Content-Type",
	})
);

app.use(bodyParser.json());

app.get("/", async (req, res) => {
	res.send("Server is Running clearly");
});

const userRouter = require("./src/routes/userRoute");
app.use("/user", userRouter);

app.listen(5500, async () => {
	await connection();
	console.log("Server is running port at 5500");
});
