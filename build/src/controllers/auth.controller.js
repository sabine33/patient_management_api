"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("@/services/auth.service"));
class AuthController {
    constructor() {
        this.authService = new auth_service_1.default();
        this.index = async (req, res, next) => {
            res.success({ status: true, message: "Hello from Auth Controller." });
        };
        this.login = async (req, res, next) => {
            const { email, password } = req.body;
            const response = await this.authService.signIn({ email, password });
            res.success({
                message: "User logged in successfully.",
                data: response,
                status: true,
            });
        };
        this.regenerateToken = async (req, res, next) => {
            const { token, email } = req.body;
            const response = await this.authService.regenerateToken({
                token,
                email,
            });
            res.success({
                message: "User token regenerated successfully.",
                data: response,
                status: true,
            });
        };
        this.signup = async (req, res, next) => {
            const { email, password } = req.body;
            const response = await this.authService.signUp({
                email,
                password,
            });
            res.success({
                message: "User signed up successfully.",
                data: response,
                status: true,
            });
        };
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map