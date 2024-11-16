const { generateRandomToken } = require("../common/userAuth");
const user = require("../models/users");
const { sendEmailForForgotPassword } = require("../services/user.service");

const register = async (req, res) => {
	try {
		const { email, password, fullName } = req.body;
		const existedUser = await user.findOne({ email });
		if (existedUser) {
			return res.status(409).json({ message: "Email already exit" });
		}
		const newUser = await user.create({ email, password, fullName });
		if (!newUser) {
			return res.status(500).json({ message: "Something went wrong" });
		}
		return res.status(201).json({ message: "User registered Successfully" });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password, rememberMe = false } = req.body;
		const existingUser = await user.findOne({ email }).select("-createdAt -updatedAt -__v");
		if (!existingUser) {
			return res.status(404).json({ message: "User not found" });
		}

		const isPasswordValid = await existingUser.isPasswordCorrect(password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid user credentials" });
		}

		const token = existingUser.generateAccessToken(existingUser, rememberMe);

		res.cookie("userlog", token, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
		});

		res.status(200).json({
			message: "User logged in successfully",
			data: {
				userId: existingUser._id,
				email: existingUser.email,
				role: existingUser.role,
				fullName: existingUser.fullName,
			},
		});
	} catch (e) {
		console.error(e);
		res.status(500).json({ message: e.message });
	}
};

const forgotPassword = async (req, res) => {
	try {
		const { email, baseUrl } = req.body;
		const exitUser = await user.findOne({ email });
		if (!exitUser) {
			return res.status(400).json({ message: "user not found" });
		}
		const token = generateRandomToken(email);
		exitUser.passwordResetToken = token;
		const resetUrl = baseUrl + "/PasswordReset/" + token;
		sendEmailForForgotPassword(email, resetUrl);
		await exitUser.save();
		res.status(200).json({ message: "please check to email" });
	} catch (e) {
		res.status(500).json({ message: e?.message });
	}
};

const getResetData = async (req, res) => {
	try {
		const { token } = req.params;
		const existingUser = await user
			.findOne({ passwordResetToken: token })
			.select("-password -role -passwordResetToken");
		if (!existingUser) {
			return res.status(400).json({ message: "This link is expired" });
		}
		return res.status(200).json({ message: "user found", data: existingUser });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

const savePassword = async (req, res) => {
	try {
		const { email, password, token } = req.body;
		const existedUser = await user.findOne({ email });
		if (!existedUser) {
			return res.status(400).json({ message: "user not found" });
		}
		if (existedUser.passwordResetToken === token) {
			existedUser.passwordResetToken = "";
			existedUser.password = password;
			await existedUser.save();
			return res.status(200).json({ message: "password save successfully" });
		} else {
			return res.status().json({ message: "token expired" });
		}
	} catch (e) {
		res.status(500).json({ message: e?.message });
	}
};

module.exports = {
	register,
	login,
	forgotPassword,
	getResetData,
	savePassword,
};
