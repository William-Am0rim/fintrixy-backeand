"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return (req, res, next) => {
        try {
            const reqAny = req;
            const data = ["body", "query", "params"].reduce((acc, key) => {
                if (reqAny[key] && Object.keys(reqAny[key]).length > 0) {
                    acc[key] = reqAny[key];
                }
                return acc;
            }, {});
            const bodyData = data.body || {};
            const result = schema.safeParse(bodyData);
            if (!result.success) {
                const errors = result.error.errors.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                }));
                return res.status(400).json({
                    success: false,
                    message: "Validation error",
                    errors,
                });
            }
            req.body = result.data;
            req.query = data.query || req.query;
            req.params = data.params || req.params;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.validate = validate;
//# sourceMappingURL=index.js.map