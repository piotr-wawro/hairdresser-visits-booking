import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "email-smtp.eu-central-1.amazonaws.com",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  secure: true,
});

// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });
