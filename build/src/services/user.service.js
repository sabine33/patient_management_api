"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@/models");
const typedi_1 = require("typedi");
const prisma_loader_1 = __importDefault(require("@/loaders/prisma.loader"));
/**
 * User Service Module
 */
let UserService = class UserService {
    /**
     * Get all users
     * @returns user[]
     */
    async getAllUsers() {
        const users = await prisma_loader_1.default.users.findMany();
        return users;
    }
    /**
     * Fetch user profile.
     * @param id
     * @returns
     */
    async profile(id) {
        const user = await models_1.User.findFirst({ where: { id } });
        if (!user) {
            throw new Error("Profile not found.");
        }
        Reflect.deleteProperty(user, "password");
        // delete user["password"];
        return user;
    }
};
UserService = __decorate([
    (0, typedi_1.Service)("userService")
], UserService);
exports.default = UserService;
//# sourceMappingURL=user.service.js.map