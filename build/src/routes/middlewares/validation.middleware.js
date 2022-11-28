"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return async (req, res, next) => {
        var _a;
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        }
        catch (error) {
            let errorMessages = (_a = error === null || error === void 0 ? void 0 : error.issues) === null || _a === void 0 ? void 0 : _a.map((x) => x === null || x === void 0 ? void 0 : x.message);
            console.log(errorMessages);
            return res.error({
                statusCode: 400,
                message: errorMessages.join(" . "),
                errors: [...errorMessages],
            });
        }
    };
};
exports.validate = validate;
//# sourceMappingURL=validation.middleware.js.map