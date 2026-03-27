"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payInstallmentSchema = exports.updateInstallmentSchema = exports.createInstallmentSchema = void 0;
const zod_1 = require("zod");
exports.createInstallmentSchema = zod_1.z.object({
    description: zod_1.z.string().min(1, "Description is required"),
    totalValue: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).transform(val => {
        if (typeof val === 'string')
            return parseFloat(val) || 0;
        return val;
    }).refine(val => val > 0, "Total value must be positive"),
    totalInstallments: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).transform(val => {
        if (typeof val === 'string')
            return parseInt(val) || 1;
        return val;
    }).refine(val => val >= 1, "Total installments must be at least 1"),
    startDate: zod_1.z.string().min(1, "Start date is required"),
    category: zod_1.z.string().min(1, "Category is required"),
    color: zod_1.z.string().min(1, "Color is required"),
});
exports.updateInstallmentSchema = zod_1.z.object({
    description: zod_1.z.string().min(1).optional(),
    totalValue: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).transform(val => {
        if (typeof val === 'string')
            return parseFloat(val) || 0;
        return val;
    }).optional(),
    totalInstallments: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).transform(val => {
        if (typeof val === 'string')
            return parseInt(val) || 1;
        return val;
    }).optional(),
    startDate: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    color: zod_1.z.string().optional(),
});
exports.payInstallmentSchema = zod_1.z.object({
    amount: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).transform(val => {
        if (typeof val === 'string')
            return parseFloat(val) || 0;
        return val;
    }).optional(),
});
//# sourceMappingURL=installment.validation.js.map