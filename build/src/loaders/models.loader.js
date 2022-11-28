"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@/helpers");
const typedi_1 = require("typedi");
const logger_loader_1 = __importDefault(require("./logger.loader"));
exports.default = ({ models }) => {
    try {
        (0, helpers_1.asyncForEach)(models, async (m) => {
            typedi_1.Container.set(m.name, m.model);
        });
        logger_loader_1.default.info("🙂 Models Loaded.");
    }
    catch (ex) {
        logger_loader_1.default.error(ex === null || ex === void 0 ? void 0 : ex.message);
    }
};
//# sourceMappingURL=models.loader.js.map