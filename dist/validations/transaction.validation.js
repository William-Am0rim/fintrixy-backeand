"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransactionSchema = exports.createTransactionSchema = void 0;
const zod_1 = require("zod");
exports.createTransactionSchema = zod_1.z.object({
    description: zod_1.z.string().min(1, "Description is required"),
    category: zod_1.z.string().min(1, "Category is required"),
    value: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).transform(val => {
        if (typeof val === 'string')
            return parseFloat(val) || 0;
        return val;
    }).refine(val => val > 0, "Value must be positive"),
    type: zod_1.z.enum(["income", "expense", "transfer"]),
    date: zod_1.z.string().or(zod_1.z.date()),
    wallet_id: zod_1.z.string().min(1, "Wallet is required"),
    wallet_to_id: zod_1.z.string().optional().nullable(),
    paid: zod_1.z.boolean().default(true),
    color: zod_1.z.string().optional(),
});
exports.updateTransactionSchema = zod_1.z.object({
    description: zod_1.z.string().min(1).optional(),
    category: zod_1.z.string().min(1).optional(),
    value: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).transform(val => {
        if (typeof val === 'string')
            return parseFloat(val) || 0;
        return val;
    }).optional(),
    type: zod_1.z.enum(["income", "expense", "transfer"]).optional(),
    date: zod_1.z.string().or(zod_1.z.date()).optional(),
    wallet_id: zod_1.z.string().optional(),
    wallet_to_id: zod_1.z.string().optional().nullable(),
    paid: zod_1.z.boolean().optional(),
    color: zod_1.z.string().optional(),
});
//# sourceMappingURL=transaction.validation.js.map