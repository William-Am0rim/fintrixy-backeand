import { z } from "zod";
export declare const createTransactionSchema: z.ZodObject<{
    description: z.ZodString;
    category: z.ZodString;
    value: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number, string | number>, number, string | number>;
    type: z.ZodEnum<["income", "expense", "transfer"]>;
    date: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    wallet_id: z.ZodString;
    wallet_to_id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    paid: z.ZodDefault<z.ZodBoolean>;
    color: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    value: number;
    type: "income" | "expense" | "transfer";
    description: string;
    category: string;
    date: string | Date;
    wallet_id: string;
    paid: boolean;
    color?: string | undefined;
    wallet_to_id?: string | null | undefined;
}, {
    value: string | number;
    type: "income" | "expense" | "transfer";
    description: string;
    category: string;
    date: string | Date;
    wallet_id: string;
    color?: string | undefined;
    wallet_to_id?: string | null | undefined;
    paid?: boolean | undefined;
}>;
export declare const updateTransactionSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number, string | number>>;
    type: z.ZodOptional<z.ZodEnum<["income", "expense", "transfer"]>>;
    date: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodDate]>>;
    wallet_id: z.ZodOptional<z.ZodString>;
    wallet_to_id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    paid: z.ZodOptional<z.ZodBoolean>;
    color: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    value?: number | undefined;
    type?: "income" | "expense" | "transfer" | undefined;
    color?: string | undefined;
    description?: string | undefined;
    category?: string | undefined;
    date?: string | Date | undefined;
    wallet_id?: string | undefined;
    wallet_to_id?: string | null | undefined;
    paid?: boolean | undefined;
}, {
    value?: string | number | undefined;
    type?: "income" | "expense" | "transfer" | undefined;
    color?: string | undefined;
    description?: string | undefined;
    category?: string | undefined;
    date?: string | Date | undefined;
    wallet_id?: string | undefined;
    wallet_to_id?: string | null | undefined;
    paid?: boolean | undefined;
}>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
//# sourceMappingURL=transaction.validation.d.ts.map