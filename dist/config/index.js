"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: parseInt(process.env.PORT || "4000"),
    nodeEnv: process.env.NODE_ENV || "development",
    jwt: {
        secret: process.env.JWT_SECRET || "default-secret-change-me",
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
    cors: {
        frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
    },
    database: {
        url: process.env.DATABASE_URL || "",
    },
    abacatepay: {
        apiKey: process.env.ABACATEPAY_API_KEY || "",
        sandbox: process.env.NODE_ENV !== "production",
    },
};
//# sourceMappingURL=index.js.map