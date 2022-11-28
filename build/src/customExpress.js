"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_types_1 = require("./types/express.types");
exports.default = {
    success: {
        value: function (success) {
            const successResponse = new express_types_1.SuccessResponse(success);
            return this.status(successResponse.response.statusCode || 200).json(successResponse.response);
        },
    },
    error: {
        value: function (error) {
            const errorResponse = new express_types_1.ErrorResponse(error);
            return this.status(errorResponse.response.statusCode || 400).json(Object.assign({ status: errorResponse.response.status || false }, errorResponse.response));
        },
    },
};
//# sourceMappingURL=customExpress.js.map