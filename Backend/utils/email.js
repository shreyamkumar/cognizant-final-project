const nodemailer = require('nodemailer');

const sendEmail = async options =>{
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "c33b0ad71780f8",
          pass: "4987f6b15a3541"
        }
      });
    const mailOptions = {
        from: 'Prakhar <hello@prakhar.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
   await transporter.sendMail(mailOptions);
}
module.exports = sendEmail;