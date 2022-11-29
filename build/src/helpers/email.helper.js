"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const index_1 = require("./index");
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailjetTransport = require("nodemailer-mailjet-transport");
const transport = nodemailer_1.default.createTransport(mailjetTransport({
    auth: {
        apiKey: process.env.MAILJET_API_KEY,
        apiSecret: process.env.MAILJET_API_SECRET,
    },
}));
/**
 * Send Email
 * @param {string,string,string,object}
 */
async function sendEmail({ receiver, subject, template }) {
    const fromEmail = `${process.env.MAILJET_SENDER || "PPM API"} <${process.env.MAILJET_SENDER_EMAIL || "sabin.khanal.33@gmail.com"}>`;
    console.log((0, index_1.renderHtmlTemplate)(template, null));
    transport.sendMail({
        from: fromEmail,
        to: receiver,
        subject: subject,
        html: (0, index_1.renderHtmlTemplate)(template, null),
    }, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
    });
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.helper.js.map