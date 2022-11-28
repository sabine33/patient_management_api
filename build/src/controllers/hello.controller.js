"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HelloController {
    async index(req, res, next) {
        res.success({ message: "Hello From PPM API." });
    }
}
exports.default = new HelloController();
//# sourceMappingURL=hello.controller.js.map