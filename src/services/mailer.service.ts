import { IEmailContent } from "@/interfaces/email.interface";
import { Service, Inject } from "typedi";
import { IUser } from "@/interfaces/user.interface";
import { sendEmail } from "@/helpers/email.helper";
import path from "path";

@Service("mailerService")
class MailerService {
  public async sendWelcomeEmail(email, data) {
    try {
      await sendEmail({
        receiver: email,
        subject: "Signup successful",
        template: "welcome_template.html",
        data: data,
      });
      console.log("Mail sent...");
      return { delivered: 1, status: "ok" };
    } catch (e) {
      return { delivered: 0, status: "error" };
    }
  }
  async sendForgotPasswordMail(email, data) {
    await sendEmail({
      receiver: email,
      template: "forgot_password_mail.html",
      subject: "Password reset link",
      data: data,
    });
    return { delivered: 1, status: "ok" };
  }
  async sendPasswordUpdatedEmail(email, data) {
    await sendEmail({
      receiver: email,
      template: "password_updated.html",
      subject: "Password update success.",
      data: data,
    });
    return { delivered: 1, status: "ok" };
  }
  async sendResetPasswordMail(email, data) {
    await sendEmail({
      receiver: email,
      template: "reset_success.html",
      subject: "Password Reset Successful.",
      data: data,
    });
    return { delivered: 1, status: "ok" };
  }
}
export default MailerService;
