"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (app) => {
    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        return res.status(404).json({
            status: false,
            statusCode: res.statusCode || 404,
            message: "Route Not found.",
        });
    });
    /// error handlers
    app.use((err, req, res, next) => {
        if (err.name === "UnauthorizedError") {
            return res.status(401).json({
                status: false,
                errors: [err.message],
                statusCode: res.statusCode || 401,
                message: "Unauthorized.",
            });
        }
        return next(err);
    });
    //joi error handling
    app.use((err, req, res, next) => {
        var _a;
        if (err && err.error && err.error.isJoi) {
            console.log(err.error);
            res.error({
                errors: [err.error.toString()],
                status: false,
                statusCode: 400,
                message: (_a = err.error) === null || _a === void 0 ? void 0 : _a.message,
            });
        }
        else {
            next(err);
        }
    });
    //generic error handler
    app.use((err, req, res, next) => {
        return res.status(400).json({
            errors: [err === null || err === void 0 ? void 0 : err.message],
            statusCode: res.statusCode || 500,
            message: (err === null || err === void 0 ? void 0 : err.message) || "Unknown Error",
        });
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.loader.js.map