"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("@/services/user.service"));
class UserController {
    constructor() {
        this.index = async (req, res, next) => {
            const users = await this.userService.getAllUsers();
            res.success({
                status: true,
                data: users,
                message: "Users loaded successfully.",
            });
        };
        this.profile = async (req, res, next) => {
            const { id } = req.user;
            if (!id) {
                throw new Error("Authentication failed.");
            }
            const data = await this.userService.profile(id);
            res.success({
                status: true,
                data: data,
                message: "Profile loaded successfully.",
            });
        };
        this.userService = new user_service_1.default();
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map