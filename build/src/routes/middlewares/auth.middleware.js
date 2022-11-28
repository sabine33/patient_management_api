"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("@/config"));
const getTokenFromHeader = (req) => {
    if ((req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Token") ||
        (req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer")) {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
};
const isAuthenticated = (req, res, next) => {
    const bearerToken = getTokenFromHeader(req);
    console.log(bearerToken);
    if (!bearerToken) {
        return res.error({
            message: "A token is required for authentication.",
            statusCode: 403,
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(bearerToken, config_1.default.tokenKey);
        req.user = decoded;
    }
    catch (err) {
        return res.error({
            message: "The token you provided is not valid.",
            statusCode: 403,
        });
    }
    return next();
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=auth.middleware.js.map