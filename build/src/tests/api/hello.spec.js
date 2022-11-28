"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const supertest_1 = __importDefault(require("supertest"));
describe("GET /", () => {
    it("Returns success message on healthcheck route", async () => {
        const res = await (0, supertest_1.default)(config_1.default.baseURL).get("/");
        console.log(res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.statusCode).toBe(200);
        expect(res.body.message).toBeDefined();
    });
});
//# sourceMappingURL=hello.spec.js.map