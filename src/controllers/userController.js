const { generateRandomToken } = require("../common/userAuth");
const user = require("../models/users");

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
		return res.status(201).json(new ApiResponse(201, createdUser, "User registered Successfully"));
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password, rememberMe = false } = req.body;
		const existingUser = await user.findOne({ email }).select("-createdAt -updatedAt -__v");
		if (!existingUser) {
			return res.status(404).json({ message: "User not exit" });
		}
		const isPasswordValid = await user.isPasswordCorrect(password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid user credentials" });
		}
		const token = await user.generateAccessToken(user, rememberMe);
		res.cookie(userlog, token, {
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
		res.status(500).json({ message: e.message });
	}
};

const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		const exitUser = await user.findOne({ email });
		const token = generateRandomToken(email);
		exitUser.passwordResetToken = token;
		await exitUser.save();
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

module.exports = {
	register,
	login,
	forgotPassword,
};
