import LoggerInstance from "@/loaders/logger.loader";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";
import argon2 from "argon2";
const EXPIRES_IN = "10h";
const TOKEN_EXPIRY_IN_MINUTES = 720;
import dayjs from "dayjs";
import config from "@/config";

export const generateTokenExpiryTime = () => {
  return dayjs().unix().valueOf() + TOKEN_EXPIRY_IN_MINUTES * 1000 * 60;
};

/**
 * Asynchronous foreach function
 * @param array
 * @param callback
 */
export async function asyncForEach<T>(
  array: Array<T>,
  callback: (item: T, index: number) => Promise<void>
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}

/**
 * Generate JWT Token
 * @param {id,email} ID & Email
 * @returns Generated token
 */
export function generateToken({ id, email }) {
  LoggerInstance.silly(`Sign JWT for userId: ${id}`);
  return jwt.sign(
    {
      id,
      email,
    },
    config.tokenKey,
    {
      expiresIn: EXPIRES_IN,
    }
  );
}

export function generateRefreshToken({ id, email, username }) {
  LoggerInstance.silly(`Sign JWT for userId: ${id}`);
  return jwt.sign(
    {
      id,
      email,
      username,
    },
    config.refreshTokenKey,
    {
      expiresIn: config.refreshTokenExpiresIn || "10h",
    }
  );
}

/**
 * Exclude keys from given object
 * @param user
 * @param keys
 * @returns
 */
export function exclude<User, Key extends keyof User>(
  user: User,
  ...keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

/**
 * Render HTML template
 * @param filename
 * @param data
 * @returns
 */
export const renderHtmlTemplate = (filename, data) => {
  const filePath = path.join(__dirname, "../emails/" + filename);
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const htmlToSend = template(data);
  return htmlToSend;
};

/**
 * Hash password
 * @param password
 * @returns Hashed Password
 */
export const hashPassword = async (password) => {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (ex) {
    throw new Error(ex);
  }
};

export const isDate = (date: string) => {
  return dayjs(date, "YYYY-MM-DD", true).isValid();
};
