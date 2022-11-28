"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validator_1 = require("@/validators/auth.validator");
const validation_middleware_1 = require("@/routes/middlewares/validation.middleware");
const router = (0, express_1.Router)();
const auth_controller_1 = __importDefault(require("@/controllers/auth.controller"));
exports.default = () => {
    router.get("/", auth_controller_1.default.index);
    router.post("/login", (0, validation_middleware_1.validate)(auth_validator_1.loginSchema), auth_controller_1.default.login);
    router.post("/token", auth_controller_1.default.regenerateToken);
    router.post("/signup", (0, validation_middleware_1.validate)(auth_validator_1.signupSchema), auth_controller_1.default.signup);
    return router;
};
//# sourceMappingURL=auth.route.js.map