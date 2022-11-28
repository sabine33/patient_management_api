"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = exports.SuccessResponse = void 0;
const lodash_1 = require("lodash");
class SuccessResponse {
    constructor(response) {
        this._response = {
            status: true,
            statusCode: response.statusCode || 200,
            data: (0, lodash_1.isArray)(response.data)
                ? response.data
                : Object.assign({}, response.data) || "{}",
            message: response.message || "Success",
        };
    }
    get response() {
        return this._response;
    }
}
exports.SuccessResponse = SuccessResponse;
class ErrorResponse {
    constructor(response) {
        this.resp = {
            status: false,
            statusCode: response.statusCode || 400,
            message: response.message || "Error Occured",
            errors: [response.errors || "Error Occured."],
        };
    }
    get response() {
        return this.resp;
    }
}
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=express.types.js.map