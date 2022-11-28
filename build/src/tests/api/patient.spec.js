"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const supertest_1 = __importDefault(require("supertest"));
let AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhYmluLmtoYW5hbC4zM0BnbWFpbC5jb20iLCJpYXQiOjE2Njk2NDYxNTksImV4cCI6MTY2OTY0OTc1OX0.EJ2cvoMVRGfiwv-au5JIwA46QYhLmn3BujoeyW9FpDA";
let defaultUser = {
    email: "apple@ball.com",
    password: "appleball",
};
const doLogin = async () => {
    let resp = await (0, supertest_1.default)(config_1.default.baseURL)
        .post("/auth/login")
        .send(defaultUser);
    AUTH_TOKEN = resp.body.data.token || "";
};
describe("/patients", () => {
    beforeAll(async () => {
        await doLogin();
    });
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
        expect(res.body.data).toBeDefined();
        expect(res.body.message).toBeDefined();
    });
    it("GET Returns a patient given a valid ID", async () => {
        const res = await (0, supertest_1.default)(config_1.default.baseURL)
            .get("/patients/8")
            .set("Authorization", `Bearer ${AUTH_TOKEN}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.errors).not.toBeDefined();
        expect(res.body.status).toBe(true);
        expect(res.body.data).toBeDefined();
        expect(res.body.message).toBeDefined();
    });
    it("GET Returns error given an invalid ID", async () => {
        const res = await (0, supertest_1.default)(config_1.default.baseURL)
            .get("/patients/19")
            .set("Authorization", `Bearer ${AUTH_TOKEN}`);
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors).toBeDefined();
        expect(res.body.data).not.toBeDefined();
        expect(res.body.message).toBeDefined();
    });
    it("POST Creates a new patient", async () => {
        const res = await (0, supertest_1.default)(config_1.default.baseURL)
            .post("/patients")
            .send({
            full_name: "TEST TEST",
            email: `test${Date.now().toString()}@test.com`,
            phone: "287873832",
            address: "i9289272",
            date_of_birth: "2020-11-30",
            is_special_attention: false,
            created_at: "2022-11-27",
            updated: "2022-11-27",
            avatar_filename: "f0bf8000b9e07f1b39105bac7904f920-316216208_1493695434484347_2012202734892512989_n.jpg",
            allergies: ["neck allergy"],
        })
            .set("Authorization", `Bearer ${AUTH_TOKEN}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.errors).not.toBeDefined();
        expect(res.body.data).toBeDefined();
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBeDefined();
    });
    it("PUT Updates a patient", async () => {
        const res = await (0, supertest_1.default)(config_1.default.baseURL)
            .put("/patients/8")
            .send({
            full_name: "Updated name for patient 8",
        })
            .set("Authorization", `Bearer ${AUTH_TOKEN}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.errors).not.toBeDefined();
        expect(res.body.data).toBeDefined();
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBeDefined();
    });
    it("DELETE Deletes a patient", async () => {
        const res = await (0, supertest_1.default)(config_1.default.baseURL)
            .delete("/patients/8")
            .set("Authorization", `Bearer ${AUTH_TOKEN}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.errors).not.toBeDefined();
        expect(res.body.data).toBeDefined();
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBeDefined();
    });
});
//# sourceMappingURL=patient.spec.js.map