import nodemailer from "nodemailer";
import "./dotenv.js";

export const transporter = nodemailer.createTransport({
  host: "email-smtp.eu-central-1.amazonaws.com",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  secure: true,
});
