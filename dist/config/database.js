"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});
// Test connection on startup
if (process.env.NODE_ENV === "development") {
    prisma.$connect()
        .then(() => console.log("✅ Database connected successfully"))
        .catch((err) => console.error("❌ Database connection failed:", err.message));
}
exports.default = prisma;
//# sourceMappingURL=database.js.map