"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./middlewares/auth.middleware");
const express_1 = require("express");
const user_controller_1 = __importDefault(require("@/controllers/user.controller"));
const router = (0, express_1.Router)();
exports.default = () => {
    router.get("/", auth_middleware_1.isAuthenticated, user_controller_1.default.index);
    router.get("/profile", auth_middleware_1.isAuthenticated, user_controller_1.default.profile);
    return router;
};
//# sourceMappingURL=user.route.js.map