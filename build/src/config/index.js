"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const isEnvFound = dotenv_1.default.config();
if (isEnvFound.error) {
    throw new Error("Unable to load .env file");
}
exports.default = {
    baseURL: (_a = process.env.BASE_URL) !== null && _a !== void 0 ? _a : "http://127.0.0.1:4000/",
    port: parseInt(process.env.PORT, 10),
    databaseURL: process.env.DATABASE_URL,
    tokenKey: process.env.JWT_TOKEN_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 ",
    refreshTokenKey: process.env.JWT_REFRESH_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "3h",
    logs: {
        level: process.env.LOG_LEVEL || "silly",
    },
    api: {
        prefix: process.env.API_PREFIX || "",
        frontendURL: process.env.FRONTEND_URL || "",
    },
};
//# sourceMappingURL=index.js.map