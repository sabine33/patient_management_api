import MailerService from "@/services/mailer.service";
import { User } from "@/models";
import { Service, Inject, Container } from "typedi";
import argon2 from "argon2";
import { hashPassword } from "@/helpers";
import { EventDispatcher } from "event-dispatch";

import prisma from "@/loaders/prisma.loader";

/**
 * User Service Module
 */
@Service("userService")
export default class UserService {
  //Event dispatcher
  private eventDispatcher: EventDispatcher;
  //mailer module
  @Inject("mailerService") private readonly mailer: MailerService;
  constructor() {
    this.eventDispatcher = new EventDispatcher();
    this.profile = this.profile.bind(this);
  }

  async getAllUsers() {
    const users = await prisma.users.findMany();
    return users;
  }

  async getDashboardSummary(user_id: number) {
    const leaderboard = await prisma.$queryRawUnsafe(
      `select * from fn_get_user_dashboard(${+user_id},1)`
    );
    if (!leaderboard) {
      throw new Error("Result not found.");
    }
    return leaderboard;
  }

  async profile(id) {
    const user = await User.findFirst({ where: { id } });
    if (!user) {
      throw new Error("Profile not found.");
    }
    delete user["password"];
    return user;
  }

  async updateProfile(id, username, password) {
    const user = await User.findFirst({ where: { id } });
    if (!user) {
      throw new Error("Unable to find user.");
    }
    let current_password = user.password;

    if (password) {
      current_password = await hashPassword(password);
      if (await argon2.verify(user.password, password)) {
        throw new Error("Old password and new password can't be same.");
      }
    }

    const updatedUser = await User.update({
      where: { id: id },
      data: {
        password: current_password,
        username,
      },
      select: { username: true, email: true },
    });
    return updatedUser;
  }
  /**
   *
   * @param id
   * @param password
   * @returns Updated user
   */
  async updatePassword(id, password) {
    const user = await User.findFirst({ where: { id } });
    if (!user) {
      throw new Error("Unable to find user.");
    }
    const hashedPassword = await hashPassword(password);

    if (await argon2.verify(user.password, password)) {
      throw new Error("New and old password can't be same.");
    }

    const updatedUser = await User.update({
      where: { id: id },
      data: {
        password: hashedPassword,
      },
      select: { email: true, username: true },
    });
    await new MailerService().sendPasswordUpdatedEmail(user.email, {
      name: user.username,
    });
    return updatedUser;
  }

  async updateAvatar(id, filename) {
    const user = await User.findFirst({ where: { id } });
    if (!user) {
      throw new Error("Unable to find user.");
    }
    const updatedUser = await User.update({
      where: { id: id },
      data: {
        avatar_file: filename,
      },
      select: {
        avatar_file: true,
      },
    });

    return updatedUser;
  }
}
