"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = exports.hashPassword = exports.renderHtmlTemplate = exports.exclude = exports.verifyRefreshToken = exports.generateRefreshToken = exports.generateToken = exports.asyncForEach = exports.generateRandomNumber = exports.generateTokenExpiryTime = void 0;
// import LoggerInstance from "@/loaders/logger.loader";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const argon2_1 = __importDefault(require("argon2"));
const EXPIRES_IN = "1h";
const TOKEN_EXPIRY_IN_MINUTES = 60;
const dayjs_1 = __importDefault(require("dayjs"));
const config_1 = __importDefault(require("../config"));
const generateTokenExpiryTime = () => {
    return (0, dayjs_1.default)().unix().valueOf() + TOKEN_EXPIRY_IN_MINUTES * 1000 * 60;
};
exports.generateTokenExpiryTime = generateTokenExpiryTime;
const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.generateRandomNumber = generateRandomNumber;
/**
 * Asynchronous foreach function
 * @param array
 * @param callback
 */
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index);
    }
}
exports.asyncForEach = asyncForEach;
/**
 * Generate JWT Token
 * @param {id,email} ID & Email
 * @returns Generated token
 */
function generateToken({ email }) {
    // LoggerInstance.silly(`Sign JWT for email: ${email}`);
    return jsonwebtoken_1.default.sign({
        email,
    }, config_1.default.tokenKey, {
        expiresIn: EXPIRES_IN,
    });
}
exports.generateToken = generateToken;
function generateRefreshToken({ email }) {
    return jsonwebtoken_1.default.sign({
        email,
    }, config_1.default.refreshTokenKey, {
        expiresIn: config_1.default.refreshTokenExpiresIn || "10h",
    });
}
exports.generateRefreshToken = generateRefreshToken;
function verifyRefreshToken({ token, email }) {
    let decoded = jsonwebtoken_1.default.verify(token, config_1.default.refreshTokenKey);
    console.log(decoded.email);
    return decoded.email === email;
}
exports.verifyRefreshToken = verifyRefreshToken;
/**
 * Exclude keys from given object
 * @param user
 * @param keys
 * @returns
 */
function exclude(user, ...keys) {
    for (let key of keys) {
        delete user[key];
    }
    return user;
}
exports.exclude = exclude;
/**
 * Render HTML template
 * @param filename
 * @param data
 * @returns
 */
const renderHtmlTemplate = (filename, data) => {
    const filePath = path_1.default.join(__dirname, "../emails/" + filename);
    const source = fs_1.default.readFileSync(filePath, "utf-8").toString();
    const template = handlebars_1.default.compile(source);
    const htmlToSend = template(data);
    return htmlToSend;
};
exports.renderHtmlTemplate = renderHtmlTemplate;
/**
 * Hash password
 * @param password
 * @returns Hashed Password
 */
const hashPassword = async (password) => {
    try {
        const hashedPassword = await argon2_1.default.hash(password);
        return hashedPassword;
    }
    catch (ex) {
        throw new Error(ex);
    }
};
exports.hashPassword = hashPassword;
const isDate = (date) => {
    return (0, dayjs_1.default)(date, "YYYY-MM-DD", true).isValid();
};
exports.isDate = isDate;
//# sourceMappingURL=index.js.map