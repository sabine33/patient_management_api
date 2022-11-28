import { Service } from "typedi";
import { sendEmail } from "@/helpers/email.helper";

@Service("mailerService")
class MailerService {
  public async sendWelcomeEmail(email) {
    try {
      await sendEmail({
        receiver: email,
        subject: "Signup successful",
        template: "welcome_template.html",
      });
      console.log("Mail sent...");
      return { delivered: 1, status: "ok" };
    } catch (e) {
      return { delivered: 0, status: "error" };
    }
  }
}
export default MailerService;
