import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const isEnvFound = dotenv.config();
if (isEnvFound.error) {
  throw new Error("Unable to load .env file");
}

export default {
  port: parseInt(process.env.PORT, 10),
  databaseURL: process.env.DATABASE_URL,
  tokenKey: process.env.JWT_TOKEN_KEY,
  refreshTokenKey: process.env.REFRESH_TOKEN_KEY || "XXXXXXXXXXXXXXXXXX",
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "10h",
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  api: {
    prefix: process.env.API_PREFIX || "",
    frontendURL: process.env.FRONTEND_URL || "",
  },
  baseURL: process.env.BASE_URL,
};
