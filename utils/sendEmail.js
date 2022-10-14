const nodemailer = require("nodemailer");

async function sendEmail({ to, subject, html }) {
	let testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});
	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"Kanban Board" <kanbanboard@kanban.com>', // sender address
		to, // list of receivers
		subject, // Email Subject
		html, // Email body
	});
}

module.exports = sendEmail;
