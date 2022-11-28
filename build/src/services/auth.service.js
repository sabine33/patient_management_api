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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailer_service_1 = __importDefault(require("@/services/mailer.service"));
const models_1 = require("@/models");
const typedi_1 = require("typedi");
const argon2 = __importStar(require("argon2"));
const helpers_1 = require("@/helpers");
const user_event_1 = __importDefault(require("@/events/user.event"));
const logger_loader_1 = __importDefault(require("@/loaders/logger.loader"));
const event_dispatch_1 = require("event-dispatch");
const client_1 = require("@prisma/client");
/**
 * Authentication Service Module
 */
let AuthService = class AuthService {
    constructor() {
        /**
         * Sign up to the app using email and password
         * @param {object}
         * @returns
         */
        this.signUp = async ({ email, password }) => {
            try {
                logger_loader_1.default.silly("Hashing password");
                const hashedPassword = await (0, helpers_1.hashPassword)(password);
                const existingUser = await models_1.User.findFirst({ where: { email } });
                if (existingUser) {
                    throw new Error("User with given email already exists.");
                }
                const user = await models_1.User.create({
                    data: {
                        email,
                        password: hashedPassword,
                    },
                });
                logger_loader_1.default.silly("Generating JWT");
                const token = (0, helpers_1.generateToken)(user);
                if (!user) {
                    throw new Error("Unable to create user.");
                }
                logger_loader_1.default.silly("Sending welcome email");
                await new mailer_service_1.default().sendWelcomeEmail(user.email);
                const newUser = user;
                Reflect.deleteProperty(newUser, "password");
                return { newUser, token };
            }
            catch (e) {
                logger_loader_1.default.error(e);
                if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    // Formatting error a bit
                    if (e.code === "P2002") {
                        throw new Error(e.message.split("\n\n\n")[1]);
                    }
                    throw new Error(e === null || e === void 0 ? void 0 : e.message);
                }
                throw new Error(e === null || e === void 0 ? void 0 : e.message);
            }
        };
        /**
         *
         * @param email {string} Email
         * @param password {string} Password
         * @returns
         */
        this.signIn = async ({ email, password }) => {
            const user = await models_1.User.findFirst({ where: { email } });
            if (!user) {
                throw new Error("User not registered");
            }
            // { salt: Buffer.from(user.salt, 'hex') }
            /**
             * argon2 to verify password
             */
            logger_loader_1.default.silly("Checking password");
            const validPassword = await argon2.verify(user.password, password, {
                raw: true,
            });
            if (validPassword) {
                logger_loader_1.default.silly("Password is valid!");
                const token = (0, helpers_1.generateToken)(user);
                const refreshToken = (0, helpers_1.generateRefreshToken)(user);
                Reflect.deleteProperty(user, "password");
                this.eventDispatcher.dispatch(user_event_1.default.user.signIn, { id: user.id });
                return { user: user, token, refreshToken };
            }
            else {
                throw new Error("Invalid Password.");
            }
        };
        /**
         * Regenerates token using refresh token
         * @param token {string} Token
         * @returns
         */
        this.regenerateToken = async ({ email, token }) => {
            const isValid = (0, helpers_1.verifyRefreshToken)({ token, email });
            if (isValid) {
                let token = (0, helpers_1.generateToken)({ email });
                return { email, token };
            }
            else {
                throw new Error("Invalid refresh token.");
            }
        };
        this.eventDispatcher = new event_dispatch_1.EventDispatcher();
        this.mailer = new mailer_service_1.default();
    }
};
__decorate([
    (0, typedi_1.Inject)("mailerService"),
    __metadata("design:type", mailer_service_1.default)
], AuthService.prototype, "mailer", void 0);
AuthService = __decorate([
    (0, typedi_1.Service)("authService"),
    __metadata("design:paramtypes", [])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map