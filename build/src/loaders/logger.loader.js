"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston = __importStar(require("winston"));
const config_1 = __importDefault(require("@/config"));
const transports = [];
if (config_1.default.port) {
    transports.push(new winston.transports.Console());
}
else {
    transports.push(new winston.transports.Console({
        format: winston.format.combine(winston.format.cli(), winston.format.splat()),
    }));
}
const LoggerInstance = winston.createLogger({
    level: config_1.default.logs.level,
    levels: winston.config.npm.levels,
    format: winston.format.combine(winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), winston.format.errors({ stack: process.env.NDOE_ENV == "development" }), winston.format.splat(), winston.format.json()),
    transports,
});
exports.default = LoggerInstance;
//# sourceMappingURL=logger.loader.js.map