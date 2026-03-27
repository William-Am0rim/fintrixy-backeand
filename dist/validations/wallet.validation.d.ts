import { z } from "zod";
export declare const createWalletSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodString;
    value_initial: z.ZodDefault<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number, string | number>>;
    color: z.ZodString;
    icon: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: string;
    value_initial: number;
    color: string;
    icon?: string | undefined;
}, {
    name: string;
    type: string;
    color: string;
    value_initial?: string | number | undefined;
    icon?: string | undefined;
}>;
export declare const updateWalletSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodString>;
    balance: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    icon: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    type?: string | undefined;
    color?: string | undefined;
    icon?: string | null | undefined;
    balance?: number | undefined;
}, {
    name?: string | undefined;
    type?: string | undefined;
    color?: string | undefined;
    icon?: string | null | undefined;
    balance?: number | undefined;
}>;
export type CreateWalletInput = z.infer<typeof createWalletSchema>;
export type UpdateWalletInput = z.infer<typeof updateWalletSchema>;
//# sourceMappingURL=wallet.validation.d.ts.map