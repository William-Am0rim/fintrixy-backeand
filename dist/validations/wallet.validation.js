"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWalletSchema = exports.createWalletSchema = void 0;
const zod_1 = require("zod");
exports.createWalletSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    type: zod_1.z.string().min(1, "Type is required"),
    value_initial: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).transform(val => {
        if (typeof val === 'string')
            return parseFloat(val) || 0;
        return val;
    }).default(0),
    color: zod_1.z.string().min(1, "Color is required"),
    icon: zod_1.z.string().optional(),
});
exports.updateWalletSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    type: zod_1.z.string().min(1).optional(),
    balance: zod_1.z.number().optional(),
    color: zod_1.z.string().optional(),
    icon: zod_1.z.string().optional().nullable(),
});
//# sourceMappingURL=wallet.validation.js.map