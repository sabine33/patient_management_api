"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const multer_1 = __importDefault(require("multer"));
const fileSize = 10 * 1024 * 1024;
/**
 * storage mechanism
 */
exports.default = (0, multer_1.default)({
    dest: "public/uploads",
    fileFilter: (request, file, callback) => {
        const acceptedTypes = file.mimetype.split("/");
        if (acceptedTypes[0] === "image") {
            callback(null, true);
        }
        else {
            callback(null, false);
            callback(new Error("Only image format allowed!"));
        }
    },
    limits: {
        fileSize,
    },
    storage: multer_1.default.diskStorage({
        destination: "public/uploads",
        filename: (request, file, callback) => {
            const fileHash = crypto_1.default.randomBytes(16).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`;
            return callback(null, fileName);
        },
    }),
});
//# sourceMappingURL=uploadHelper.js.map