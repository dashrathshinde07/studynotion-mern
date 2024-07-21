const nodemailer = require("nodemailer"); // Importing nodemailer module to send emails

require("dotenv").config(); // Importing and configuring dotenv to load environment variables from .env file

// Function to send email
const mailSender = async (email, title, body) => {
  try {
    // Creating a transporter object to send email
    let tranporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // Email host from environment variables
      auth: {
        user: process.env.MAIL_USER, // Email user from environment variables
        pass: process.env.MAIL_PASS, // Email password from environment variables
      },
    });

    // Sending the email
    let info = await tranporter.sendMail({
      from: "StudyNotion || Codehelp - by babbar", // Sender's name
      to: `${email}`, // Receiver's email
      subject: `${title}`, // Email subject
      html: `${body}`, // Email body in HTML format
    });
    console.log(info); // Logging the info about sent email
    return info; // Returning the info
  } catch (error) {
    console.log(error.message); // Logging the error message if any error occurs
  }
};

module.exports = mailSender; // Exporting the mailSender function
