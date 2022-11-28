"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadHelper_1 = __importDefault(require("@/helpers/uploadHelper"));
const upload_controller_1 = __importDefault(require("@/controllers/upload.controller"));
const router = (0, express_1.Router)();
exports.default = () => {
    router.post("/image", uploadHelper_1.default.single("image"), upload_controller_1.default.uploadImage);
    return router;
};
//# sourceMappingURL=upload.route.js.map