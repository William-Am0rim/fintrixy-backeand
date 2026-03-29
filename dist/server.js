"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const config_1 = require("./config");
const swagger_1 = __importDefault(require("./config/swagger"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:3000", "https://fintrixy-frontend-9rrf.vercel.app"];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api", limiter);
app.use((0, morgan_1.default)(config_1.config.nodeEnv === "development" ? "dev" : "combined"));
app.use(express_1.default.json({ limit: "10kb" }));
app.use(express_1.default.urlencoded({ extended: true }));
/**
 * @swagger
 * /:
 *   get:
 *     summary: API Health Check
 *     responses:
 *       200:
 *         description: API is healthy
 */
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Fintrixy API is running",
        version: "1.0.0",
        documentation: "/api-docs",
    });
});
/**
 * @swagger
 * /api-docs:
 *   get:
 *     summary: API Documentation
 *     responses:
 *       200:
 *         description: Swagger UI loaded
 */
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Fintrixy API Documentation",
}));
app.use("/api", routes_1.default);
app.use(error_middleware_1.notFound);
app.use(error_middleware_1.globalErrorHandler);
const PORT = config_1.config.port;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    console.log(`🌍 Environment: ${config_1.config.nodeEnv}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map