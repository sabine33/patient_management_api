import { Container } from "typedi";
import { EventSubscriber, On } from "event-dispatch";
import { Logger } from "winston";
import events from "../user.event";
import { IUser } from "@/interfaces/user.interface";
import MailerService from "@/services/mailer.service";
import { now } from "lodash";

@EventSubscriber()
export default class UserSubscriber {
  @On(events.user.signIn)
  public async onUserSignIn({ id }: Partial<IUser>) {
    const Logger: Logger = Container.get("logger");
    try {
      Logger.info({ message: "User signed in" });
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.user.signIn}: %o`, e);
      throw e;
    }
  }

  @On(events.user.signUp)
  public async onUserSignUp({ email }: Partial<IUser>) {
    const Logger: Logger = Container.get("logger");
    try {
      await new MailerService().sendWelcomeEmail(email);
      Logger.info({ message: email });
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.user.signUp}: %o`, e);
      throw e;
    }
  }
}
