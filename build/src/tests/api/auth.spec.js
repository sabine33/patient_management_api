"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const supertest_1 = __importDefault(require("supertest"));
let user = {
    email: "test+1@gmail.com",
    password: "appleball",
};
describe("/auth/signup", () => {
    /** Signup new user */
    it("POST Returns success on signup new user", async () => {
        let user = {
            email: `test+${Date.now()}@user.com`,
            password: "appleball",
        };
        const res = await (0, supertest_1.default)(config_1.default.baseURL).post("/auth/signup").send(user);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBeDefined();
    });
    /** Signup already existing user */
    it("POST Returns error on signing up already existing user", async () => {
        const res = await (0, supertest_1.default)(config_1.default.baseURL).post("/auth/signup").send(user);
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors).toBeDefined();
        expect(res.body.message).toBeDefined();
    });
    /** sign up with invalid data */
    it("POST Returns error on signing up with invalid email or password", async () => {
        let user = {
            email: "test+1",
            password: "apple",
        };
        const res = await (0, supertest_1.default)(config_1.default.baseURL).post("/auth/signup").send(user);
        expect(res.statusCode).toEqual(400);
        expect(res.body.status).toEqual(false);
        expect(res.body.errors).toBeDefined();
        expect(res.body.message).toBeDefined();
    });
});
describe("POST /auth/login", () => {
    /** Login with correct details */
    it("POST Returns success on logging in with correct email or password", async () => {
        const res = await (0, supertest_1.default)(config_1.default.baseURL).post("/auth/login").send(user);
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
        expect(res.body.errors).not.toBeDefined();
        expect(res.body.message).toBeDefined();
        expect(res.body.data.user).toBeDefined();
        expect(res.body.data.token).toBeDefined();
    });
    /** Login with incorrect details */
    it("POST Returns error on logging in with correct email or password", async () => {
        const res = await (0, supertest_1.default)(config_1.default.baseURL).post("/auth/login").send({
            email: "apple+1@ball.com",
            password: "appleball",
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors).toBeDefined();
        expect(res.body.message).toBeDefined();
        expect(res.body.data).not.toBeDefined();
    });
});
//# sourceMappingURL=auth.spec.js.map