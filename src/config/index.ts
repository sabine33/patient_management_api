import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const isEnvFound = dotenv.config();
if (isEnvFound.error) {
  throw new Error("Unable to load .env file");
}

export default {
  baseURL: process.env.BASE_URL ?? "http://127.0.0.1:4000/",
  port: parseInt(process.env.PORT, 10),
  databaseURL: process.env.DATABASE_URL,
  tokenKey:
    process.env.JWT_TOKEN_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 ",
  refreshTokenKey:
    process.env.JWT_REFRESH_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "3h",
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  api: {
    prefix: process.env.API_PREFIX || "",
    frontendURL: process.env.FRONTEND_URL || "",
  },
};
