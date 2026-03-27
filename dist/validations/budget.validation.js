"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBudgetSchema = exports.createBudgetSchema = void 0;
const zod_1 = require("zod");
exports.createBudgetSchema = zod_1.z.object({
    category: zod_1.z.string().min(1, "Category is required"),
    limit: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).transform(val => {
        if (typeof val === 'string')
            return parseFloat(val) || 0;
        return val;
    }).refine(val => val > 0, "Limit must be positive"),
    spent: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).transform(val => {
        if (typeof val === 'string')
            return parseFloat(val) || 0;
        return val;
    }).default(0),
    color: zod_1.z.string().min(1, "Color is required"),
    icon: zod_1.z.string().min(1, "Icon is required"),
});
exports.updateBudgetSchema = zod_1.z.object({
    category: zod_1.z.string().min(1).optional(),
    limit: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).transform(val => {
        if (typeof val === 'string')
            return parseFloat(val) || 0;
        return val;
    }).optional(),
    spent: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).transform(val => {
        if (typeof val === 'string')
            return parseFloat(val) || 0;
        return val;
    }).optional(),
    color: zod_1.z.string().optional(),
    icon: zod_1.z.string().optional(),
});
//# sourceMappingURL=budget.validation.js.map