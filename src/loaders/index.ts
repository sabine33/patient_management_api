import UserService from "@/services/user.service";
import AuthService from "@/services/auth.service";
import MailerService from "@/services/mailer.service";
import containerLoader from "./container.loader";
import expressLoader from "./express.loader";
import LoggerInstance from "./logger.loader";
import Logger from "./logger.loader";
import prisma from "./prisma.loader";
import "./events.loader";

export default async ({ expressApp }) => {
  await containerLoader([
    {
      key: "mailerService",
      object: new MailerService(),
    },
    {
      key: "logger",
      object: LoggerInstance,
    },
    {
      key: "prisma",
      object: await prisma,
    },
    {
      key: "authService",
      object: new AuthService(),
    },
    {
      key: "userService",
      object: new UserService(),
    },
  ]);
  Logger.info("DI Containers loaded");

  ``;
  await expressLoader({ app: expressApp });
  Logger.info("Express loaded");
};
