"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const logger_loader_1 = __importDefault(require("@/loaders/logger.loader"));
const express_1 = __importDefault(require("express"));
const process_1 = __importDefault(require("process"));
const config_1 = __importDefault(require("@/config"));
const customExpress_1 = __importDefault(require("./customExpress"));
const app = (0, express_1.default)();
/**
 * Adding features to express response
 */
const customExpressResponse = Object.create(app.response, customExpress_1.default);
//override express response
app.response = Object.create(customExpressResponse);
exports.server = app
    .listen(config_1.default.port || 3000, async () => {
    await require("./loaders").default({ expressApp: app });
    logger_loader_1.default.info(`
      ################################################
      🛡️  Server listening on port: ${config_1.default.port} 🛡️
      ################################################
    `);
})
    .on("error", async (err) => {
    logger_loader_1.default.error(err);
    process_1.default.exit(1);
});
process_1.default.on("SIGTERM", () => {
    console.info("SIGTERM signal received: closing HTTP server");
    exports.server.close(() => {
        console.info("HTTP server closed");
    });
});
process_1.default
    .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
})
    .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process_1.default.exit(1);
});
exports.default = app;
//# sourceMappingURL=app.js.map