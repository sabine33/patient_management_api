"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("@/services/user.service"));
const auth_service_1 = __importDefault(require("@/services/auth.service"));
const mailer_service_1 = __importDefault(require("@/services/mailer.service"));
const container_loader_1 = __importDefault(require("./container.loader"));
const express_loader_1 = __importDefault(require("./express.loader"));
const logger_loader_1 = __importDefault(require("./logger.loader"));
const logger_loader_2 = __importDefault(require("./logger.loader"));
const prisma_loader_1 = __importDefault(require("./prisma.loader"));
require("./events.loader");
exports.default = async ({ expressApp }) => {
    await (0, container_loader_1.default)([
        {
            key: "mailerService",
            object: new mailer_service_1.default(),
        },
        {
            key: "logger",
            object: logger_loader_1.default,
        },
        {
            key: "prisma",
            object: await prisma_loader_1.default,
        },
        {
            key: "authService",
            object: new auth_service_1.default(),
        },
        {
            key: "userService",
            object: new user_service_1.default(),
        },
    ]);
    logger_loader_2.default.info("DI Containers loaded");
    ``;
    await (0, express_loader_1.default)({ app: expressApp });
    logger_loader_2.default.info("Express loaded");
};
//# sourceMappingURL=index.js.map