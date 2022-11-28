"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const supertest_1 = __importDefault(require("supertest"));
//   let randomNumber = generateRandomNumber(1, 1000);
let AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFwcGxlQGdtYWlsLmNvbSIsImlhdCI6MTY2OTYwNTUyMCwiZXhwIjoxNjY5NjA5MTIwfQ.1zCUi4ACPc8sottqoUiydoDmcyeF6WenYBxt9JFrzgI";
let defaultUser = {
    email: "apple@ball.com",
    password: "appleball",
};
const doLogin = async () => {
    let resp = await (0, supertest_1.default)(config_1.default.baseURL)
        .post("/auth/login")
        .send(defaultUser);
    AUTH_TOKEN = resp.body.token || "";
};
describe("/patients", () => {
    //   beforeAll(async () => {
    //     await doLogin();
    //   });
    /** Signup new user */
    it("GET Returns list of patients without auth token", async () => {
        const res = await (0, supertest_1.default)(config_1.default.baseURL).get("/patients");
        expect(res.statusCode).toEqual(403);
        expect(res.body.errors).toBeDefined();
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBeDefined();
    });
    it("GET Returns list of patients with auth token", async () => {
        const res = await (0, supertest_1.default)(config_1.default.baseURL)
            .get("/patients")
            .set("Authorization", `Bearer ${AUTH_TOKEN}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.errors).not.toBeDefined();
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBeDefined();
    });
});
//# sourceMappingURL=patient.spec.js.map