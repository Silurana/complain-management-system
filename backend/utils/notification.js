const nodemailer = require("nodemailer");
const ENV = require("../config/env");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: ENV.email_user,
        pass: ENV.email_pass,
      },
    });

    const mailOptions = {
      from: `"Complaint Management System" <${ENV.email_user}>`,
      to: to,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", to);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

module.exports = { sendEmail };
