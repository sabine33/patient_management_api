"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const email_helper_1 = require("@/helpers/email.helper");
let MailerService = class MailerService {
    async sendWelcomeEmail(email) {
        try {
            await (0, email_helper_1.sendEmail)({
                receiver: email,
                subject: "Signup successful",
                template: "welcome_template.html",
            });
            console.log("Mail sent...");
            return { delivered: 1, status: "ok" };
        }
        catch (e) {
            return { delivered: 0, status: "error" };
        }
    }
};
MailerService = __decorate([
    (0, typedi_1.Service)("mailerService")
], MailerService);
exports.default = MailerService;
//# sourceMappingURL=mailer.service.js.map