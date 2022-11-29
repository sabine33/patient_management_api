import MailerService from "@/services/mailer.service";
import { User } from "@/models";
import { Service, Inject, Container } from "typedi";
import prisma from "@/loaders/prisma.loader";

/**
 * User Service Module
 */
@Service("userService")
export default class UserService {
  /**
   * Get all users
   * @returns user[]
   */
  async getAllUsers() {
    const users = await prisma.users.findMany();
    return users;
  }

  /**
   * Fetch user profile.
   * @param id
   * @returns
   */
  async profile(id) {
    const user = await User.findFirst({ where: { id } });
    if (!user) {
      throw new Error("Profile not found.");
    }
    Reflect.deleteProperty(user, "password");
    // delete user["password"];
    return user;
  }
}
