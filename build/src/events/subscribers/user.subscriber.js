"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const event_dispatch_1 = require("event-dispatch");
const user_event_1 = __importDefault(require("../user.event"));
const mailer_service_1 = __importDefault(require("@/services/mailer.service"));
let UserSubscriber = class UserSubscriber {
    async onUserSignIn({ id }) {
        const Logger = typedi_1.Container.get("logger");
        try {
            Logger.info({ message: "User signed in" });
        }
        catch (e) {
            Logger.error(`🔥 Error on event ${user_event_1.default.user.signIn}: %o`, e);
            throw e;
        }
    }
    async onUserSignUp({ email }) {
        const Logger = typedi_1.Container.get("logger");
        try {
            await new mailer_service_1.default().sendWelcomeEmail(email);
            Logger.info({ message: email });
        }
        catch (e) {
            Logger.error(`🔥 Error on event ${user_event_1.default.user.signUp}: %o`, e);
            throw e;
        }
    }
};
__decorate([
    (0, event_dispatch_1.On)(user_event_1.default.user.signIn),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserSubscriber.prototype, "onUserSignIn", null);
__decorate([
    (0, event_dispatch_1.On)(user_event_1.default.user.signUp),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserSubscriber.prototype, "onUserSignUp", null);
UserSubscriber = __decorate([
    (0, event_dispatch_1.EventSubscriber)()
], UserSubscriber);
exports.default = UserSubscriber;
//# sourceMappingURL=user.subscriber.js.map