const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowecase: true,
			trim: true,
		},
		fullName: {
			type: String,
			required: true,
			trim: true,
			index: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		role: {
			type: Number,
			enum: [100, 200],
			default: 100,
			require: true,
		},
		passwordResetToken: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (user, rememberMe) {
	const data = jwt.sign(
		{
			_id: user._id,
			email: user.email,
			fullName: user.fullName,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: rememberMe === false ? process.env.ACCESS_TOKEN_EXPIRY : "10d",
		}
	);
	return data;
};

let User = model("user", userSchema);
module.exports = User;
