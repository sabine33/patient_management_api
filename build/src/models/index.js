"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.User = void 0;
const prisma_loader_1 = __importDefault(require("@/loaders/prisma.loader"));
//bigint issue fix:maybe we could have better solution
require("./patch.js");
exports.User = prisma_loader_1.default.users;
exports.Token = prisma_loader_1.default.user_tokens;
//# sourceMappingURL=index.js.map