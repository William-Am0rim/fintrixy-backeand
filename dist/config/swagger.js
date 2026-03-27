"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Fintrixy API",
            version: "1.0.0",
            description: "API for Fintrixy - Personal Finance Management System",
        },
        servers: [
            {
                url: "http://localhost:4000",
                description: "Development server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: { type: "string", format: "uuid" },
                        name: { type: "string" },
                        email: { type: "string", format: "email" },
                        image: { type: "string", nullable: true },
                    },
                },
                Wallet: {
                    type: "object",
                    properties: {
                        id: { type: "string", format: "uuid" },
                        name: { type: "string" },
                        type: { type: "string" },
                        balance: { type: "number" },
                        color: { type: "string" },
                        icon: { type: "string", nullable: true },
                    },
                },
                Transaction: {
                    type: "object",
                    properties: {
                        id: { type: "string", format: "uuid" },
                        description: { type: "string" },
                        category: { type: "string" },
                        value: { type: "number" },
                        type: { type: "string", enum: ["income", "expense", "transfer"] },
                        date: { type: "string", format: "date-time" },
                        paid: { type: "boolean" },
                    },
                },
                Goal: {
                    type: "object",
                    properties: {
                        id: { type: "string", format: "uuid" },
                        name: { type: "string" },
                        target: { type: "number" },
                        current: { type: "number" },
                        deadline: { type: "string", format: "date-time" },
                        color: { type: "string" },
                        icon: { type: "string" },
                        completed: { type: "boolean" },
                    },
                },
                Budget: {
                    type: "object",
                    properties: {
                        id: { type: "string", format: "uuid" },
                        category: { type: "string" },
                        limit: { type: "number" },
                        spent: { type: "number" },
                        color: { type: "string" },
                        icon: { type: "string" },
                    },
                },
                Installment: {
                    type: "object",
                    properties: {
                        id: { type: "string", format: "uuid" },
                        description: { type: "string" },
                        totalValue: { type: "number" },
                        paidValue: { type: "number" },
                        totalInstallments: { type: "integer" },
                        paidInstallments: { type: "integer" },
                        nextDueDate: { type: "string", format: "date-time" },
                        completed: { type: "boolean" },
                    },
                },
                Recurrence: {
                    type: "object",
                    properties: {
                        id: { type: "string", format: "uuid" },
                        description: { type: "string" },
                        value: { type: "number" },
                        type: { type: "string", enum: ["income", "expense"] },
                        frequency: { type: "string", enum: ["daily", "weekly", "monthly", "yearly"] },
                        nextDate: { type: "string", format: "date-time" },
                        active: { type: "boolean" },
                    },
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ["./src/server.ts"],
};
exports.default = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map