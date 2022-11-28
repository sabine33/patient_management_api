"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("@/routes"));
const config_1 = __importDefault(require("@/config"));
require("express-async-errors");
const error_loader_1 = require("./error.loader");
exports.default = ({ app }) => {
    app.get("/healthcheck", (req, res) => {
        res.status(200).json({ status: true });
    });
    app.enable("trust proxy");
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(config_1.default.api.prefix, (0, routes_1.default)());
    app.use(body_parser_1.default.json({
        type: "application/*.json",
    }));
    app.all("/media/*", (req, res, next) => {
        res.status(403).send({
            message: "Access Forbidden",
        });
    });
    app.use("/", express_1.default.static("public"));
    (0, error_loader_1.errorHandler)(app);
};
//# sourceMappingURL=express.loader.js.map