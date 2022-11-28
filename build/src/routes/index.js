"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const docs_route_1 = __importDefault(require("./docs.route"));
const hello_route_1 = __importDefault(require("./hello.route"));
const patient_route_1 = __importDefault(require("./patient.route"));
const upload_route_1 = __importDefault(require("./upload.route"));
const user_route_1 = __importDefault(require("./user.route"));
exports.default = () => {
    const router = (0, express_1.Router)();
    router.use("/", (0, hello_route_1.default)());
    router.use("/users", (0, user_route_1.default)());
    router.use("/auth", (0, auth_route_1.default)());
    router.use("/patients", (0, patient_route_1.default)());
    router.use("/docs", (0, docs_route_1.default)());
    router.use("/uploads", (0, upload_route_1.default)());
    return router;
};
//# sourceMappingURL=index.js.map