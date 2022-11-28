import MailerService from "@/services/mailer.service";
import { User, Token } from "@/models";
import { Service, Inject, Container } from "typedi";
import * as argon2 from "argon2";
import {
  generateRefreshToken,
  generateToken,
  hashPassword,
  verifyRefreshToken,
} from "@/helpers";
import events from "@/events/user.event";
import Logger from "@/loaders/logger.loader";
import { EventDispatcher } from "event-dispatch";
import { Prisma } from "@prisma/client";

/**
 * Authentication Service Module
 */
@Service("authService")
export default class AuthService {
  private eventDispatcher: EventDispatcher;
  @Inject("mailerService") private readonly mailer: MailerService;
  constructor() {
    this.eventDispatcher = new EventDispatcher();
    this.mailer = new MailerService();
  }

  /**
   * Sign up to the app using email and password
   * @param {object}
   * @returns
   */

  signUp = async ({ email, password }): Promise<any> => {
    try {
      Logger.silly("Hashing password");

      const hashedPassword = await hashPassword(password);
      const existingUser = await User.findFirst({ where: { email } });

      if (existingUser) {
        throw new Error("User with given email already exists.");
      }

      const user = await User.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      Logger.silly("Generating JWT");
      const token = generateToken(user);

      if (!user) {
        throw new Error("Unable to create user.");
      }

      Logger.silly("Sending welcome email");

      await new MailerService().sendWelcomeEmail(user.email);

      const newUser = user;

      Reflect.deleteProperty(newUser, "password");

      return { newUser, token };
    } catch (e) {
      Logger.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Formatting error a bit
        if (e.code === "P2002") {
          throw new Error(e.message.split("\n\n\n")[1]);
        }
        throw new Error(e?.message);
      }

      throw new Error(e?.message);
    }
  };

  /**
   *
   * @param email {string} Email
   * @param password {string} Password
   * @returns
   */
  signIn = async ({ email, password }): Promise<any> => {
    const user = await User.findFirst({ where: { email } });

    if (!user) {
      throw new Error("User not registered");
    }

    // { salt: Buffer.from(user.salt, 'hex') }
    /**
     * argon2 to verify password
     */
    Logger.silly("Checking password");
    const validPassword = await argon2.verify(user.password, password, {
      raw: true,
    });

    if (validPassword) {
      Logger.silly("Password is valid!");
      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user);

      Reflect.deleteProperty(user, "password");

      this.eventDispatcher.dispatch(events.user.signIn, { id: user.id });

      return { user: user, token, refreshToken };
    } else {
      throw new Error("Invalid Password.");
    }
  };

  /**
   * Regenerates token using refresh token
   * @param token {string} Token
   * @returns
   */
  regenerateToken = async ({ email, token }): Promise<any> => {
    const isValid = verifyRefreshToken({ token, email });
    if (isValid) {
      let token = generateToken({ email });
      return { email, token };
    } else {
      throw new Error("Invalid refresh token.");
    }
  };
}
