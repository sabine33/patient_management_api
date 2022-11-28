import { renderHtmlTemplate } from "./index";
import nodemailer from "nodemailer";

const mailjetTransport = require("nodemailer-mailjet-transport");
const transport = nodemailer.createTransport(
  mailjetTransport({
    auth: {
      apiKey: process.env.MAILJET_API_KEY,
      apiSecret: process.env.MAILJET_API_SECRET,
    },
  })
);

/**
 * Send Email
 * @param {string,string,string,object}
 */
export async function sendEmail({ receiver, subject, template, data }) {
  const fromEmail = `${process.env.MAILJET_SENDER || "Leapfrog"} <${
    process.env.MAILJET_SENDER_EMAIL || "sabin.khana.33l@gmail.com"
  }>`;

  console.log(renderHtmlTemplate(template, data));

  transport.sendMail(
    {
      from: fromEmail,
      to: receiver,
      subject: subject,
      html: renderHtmlTemplate(template, data),
    },
    (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    }
  );
}