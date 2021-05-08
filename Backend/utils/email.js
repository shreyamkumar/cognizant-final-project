const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
	// const transporter = nodemailer.createTransport({
	//     host: "smtp.mailtrap.io",
	//     port: 2525,
	//     auth: {
	//       user: "c33b0ad71780f8",
	//       pass: "4987f6b15a3541"
	//     }
	//   });
	const transport = nodemailer.createTransport({
		host: 'smtp.mailtrap.io',
		port: 2525,
		auth: {
			user: '243fc7237db731',
			pass: '9e2840996b6e6d',
		},
	});
	const mailOptions = {
		from: 'Internship <hello@project.com>',
		to: options.email,
		subject: options.subject,
		text: options.message,
	};
	await transport.sendMail(mailOptions);
};
module.exports = sendEmail;
