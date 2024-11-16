const forgetHtmltemplate = require("../templates/forgotPassword");
const { createMailOption } = require("../common/sendEmail");
const { sendMail } = require("../common/sendEmail");

const sendEmailForForgotPassword = (email, resetUrl) => {
	try {
		const htmlTemplate = forgetHtmltemplate(resetUrl);
		const subject = "Password Reset Request";
		const text = `Hi, We received a request to reset the password for your account.`;
		const mailOption = createMailOption(email, subject, text, htmlTemplate);
		sendMail(mailOption);
	} catch (e) {
		throw new Error(e?.message);
	}
};

module.exports = {
	sendEmailForForgotPassword,
};
