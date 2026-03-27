"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecurrenceSchema = exports.createRecurrenceSchema = void 0;
const zod_1 = require("zod");
exports.createRecurrenceSchema = zod_1.z.object({
    description: zod_1.z.string().min(1, "Description is required"),
    value: zod_1.z.number().positive("Value must be positive"),
    type: zod_1.z.enum(["income", "expense"]),
    frequency: zod_1.z.enum(["daily", "weekly", "monthly", "yearly"]),
    nextDate: zod_1.z.string().or(zod_1.z.date()),
    wallet_id: zod_1.z.string().uuid("Invalid wallet ID"),
    category: zod_1.z.string().min(1, "Category is required"),
    color: zod_1.z.string().min(1, "Color is required"),
});
exports.updateRecurrenceSchema = zod_1.z.object({
    description: zod_1.z.string().min(1).optional(),
    value: zod_1.z.number().positive().optional(),
    type: zod_1.z.enum(["income", "expense"]).optional(),
    frequency: zod_1.z.enum(["daily", "weekly", "monthly", "yearly"]).optional(),
    nextDate: zod_1.z.string().or(zod_1.z.date()).optional(),
    wallet_id: zod_1.z.string().uuid().optional(),
    category: zod_1.z.string().optional(),
    color: zod_1.z.string().optional(),
    active: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=recurrence.validation.js.map