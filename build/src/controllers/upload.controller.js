"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UploadController {
    constructor() {
        this.uploadImage = async (req, res, next) => {
            const fileUrl = req.file;
            res.success({
                status: true,
                data: { filename: fileUrl.filename },
                message: "Image uploaded successfully.",
            });
        };
    }
}
exports.default = new UploadController();
//# sourceMappingURL=upload.controller.js.map