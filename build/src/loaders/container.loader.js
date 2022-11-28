"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@/helpers");
const logger_loader_1 = __importDefault(require("@/loaders/logger.loader"));
require("reflect-metadata");
const typedi_1 = require("typedi");
exports.default = async (containers) => {
    try {
        await (0, helpers_1.asyncForEach)(containers, async (item) => {
            typedi_1.Container.set(`${item.key}`, item.object);
        });
        logger_loader_1.default.info("✌️injected into container");
    }
    catch (e) {
        logger_loader_1.default.error("🔥 Error on container loading process: %o", e);
        throw e;
    }
};
//# sourceMappingURL=container.loader.js.map