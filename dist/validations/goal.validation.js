"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contributeGoalSchema = exports.updateGoalSchema = exports.createGoalSchema = void 0;
const zod_1 = require("zod");
exports.createGoalSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    target: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).transform(val => {
        if (typeof val === 'string')
            return parseFloat(val) || 0;
        return val;
    }).refine(val => val > 0, "Target must be positive"),
    current: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).transform(val => {
        if (typeof val === 'string')
            return parseFloat(val) || 0;
        return val;
    }).default(0),
    deadline: zod_1.z.string().min(1, "Deadline is required"),
    color: zod_1.z.string().min(1, "Color is required"),
    icon: zod_1.z.string().min(1, "Icon is required"),
});
exports.updateGoalSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    target: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).transform(val => {
        if (typeof val === 'string')
            return parseFloat(val) || 0;
        return val;
    }).optional(),
    current: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).transform(val => {
        if (typeof val === 'string')
            return parseFloat(val) || 0;
        return val;
    }).optional(),
    deadline: zod_1.z.string().optional(),
    color: zod_1.z.string().optional(),
    icon: zod_1.z.string().optional(),
    completed: zod_1.z.boolean().optional(),
});
exports.contributeGoalSchema = zod_1.z.object({
    amount: zod_1.z.number().positive("Amount must be positive"),
});
//# sourceMappingURL=goal.validation.js.map