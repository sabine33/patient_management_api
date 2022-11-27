import MailerService from "@/services/mailer.service";
import { User, Token } from "@/models";
import { Service, Inject, Container } from "typedi";
import * as argon2 from "argon2";
import { generateRefreshToken, generateToken, hashPassword } from "@/helpers";
import events from "@/events/user.event";
import Logger from "@/loaders/logger.loader";
import { EventDispatcher } from "event-dispatch";
import { Prisma } from "@prisma/client";
import crypto from "crypto";
import { generateTokenExpiryTime } from "@/helpers";
import dayjs from "dayjs";

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

      await new MailerService().sendWelcomeEmail(user.email, {
        username: user.email,
      });

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
    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    Logger.silly("Checking password");
    const validPassword = await argon2.verify(user.password, password, {
      raw: true,
    });
    // { salt: Buffer.from(user.salt, 'hex') }
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
   * Forgot password
   * @param {string} Email
   * @returns
   */
  forgotPassword = async ({ email }): Promise<any> => {
    //fetch user
    const user = await User.findFirst({ where: { email } });
    if (!user) {
      throw new Error("User not found.");
    }
    let token = await Token.findFirst({ where: { user_id: user.id } });
    if (token) {
      await Token.delete({ where: { user_id: user.id } });
    }
    let resetToken = crypto.randomBytes(32).toString("hex");

    const hash = await (
      await argon2.hash(resetToken, { raw: true })
    ).toString("hex");

    const newToken = await Token.create({
      data: {
        user_id: user.id,
        token: hash,
        // token_expiry_date: generateTokenExpiryTime(),
      },
    });

    console.log(hash);
    console.log(JSON.stringify(newToken));

    const context = {
      id: user.id,
      url: `${process.env.FRONTEND_URL}/auth/validate-token/${user.id}/${hash}`,
      name: user.username,
    };
    await new MailerService().sendForgotPasswordMail(user.email, context);
    return { newToken };
  };

  /**
   * Resets password
   * @param {email,token,password}
   * @returns {object} Updated user
   */
  resetPassword = async ({ email, token, password }) => {
    let user = await User.findFirst({
      where: { email },
      include: {
        tokens: true,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    if (
      !user?.tokens ||
      !user?.tokens?.password_reset_token ||
      user?.tokens?.password_reset_token !== token
    ) {
      throw new Error("Invalid or expired password reset token");
    }
    if (
      dayjs
        .unix(Number.parseInt(user?.tokens?.password_reset_token))
        .isAfter(dayjs().unix())
    ) {
      throw new Error("Expired password reset token.");
    }
    if (await argon2.verify(user.password, password, { raw: true })) {
      throw new Error("New and old password can't be same.");
    }

    const hashedPassword = await argon2.hash(password);

    await User.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
    const updatedUser = await User.findFirst({
      where: { id: user.id },
      select: { id: true, email: true, username: true },
    });
    await Token.delete({ where: { user_id: user.id } });
    await new MailerService().sendResetPasswordMail(user.email, {
      name: user.username,
    });

    return { updatedUser };
  };

  /**
   * Validate Token
   * @param id
   * @param token
   * @returns {boolean} true or false representing whether token is valid or not
   */
  validateToken = async (id: number, token: string) => {
    const user = await User.findFirst({
      where: { id },
      include: { tokens: true },
    });
    if (!user) {
      throw new Error("User not found.");
    }

    console.log(Date.now());
    console.log(user?.tokens?.token_expiry_date);

    if (
      !user?.tokens?.password_reset_token ||
      user?.tokens?.password_reset_token !== token
    ) {
      throw new Error("Invalid or expired password reset token.");
    }
    if (
      dayjs
        .unix(Number.parseInt(user?.tokens?.password_reset_token))
        .isAfter(dayjs().unix())
    ) {
      throw new Error("Expired password reset token.");
    }
    return true;
  };
}
