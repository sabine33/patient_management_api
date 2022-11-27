import { Prisma } from "@prisma/client";
import prisma from "@/loaders/prisma.loader";
//bigint issue fix:maybe we could have better solution
require("./patch.js");

export const User: Prisma.usersDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
> = prisma.users as Prisma.usersDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>;
export const Token: Prisma.user_tokensDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
> = prisma.user_tokens as Prisma.user_tokensDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>;
