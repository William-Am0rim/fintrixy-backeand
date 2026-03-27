import { z } from "zod";
export declare const createInstallmentSchema: z.ZodObject<{
    description: z.ZodString;
    totalValue: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number, string | number>, number, string | number>;
    totalInstallments: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number, string | number>, number, string | number>;
    startDate: z.ZodString;
    category: z.ZodString;
    color: z.ZodString;
}, "strip", z.ZodTypeAny, {
    color: string;
    startDate: string;
    description: string;
    category: string;
    totalValue: number;
    totalInstallments: number;
}, {
    color: string;
    startDate: string;
    description: string;
    category: string;
    totalValue: string | number;
    totalInstallments: string | number;
}>;
export declare const updateInstallmentSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    totalValue: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number, string | number>>;
    totalInstallments: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number, string | number>>;
    startDate: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    color?: string | undefined;
    startDate?: string | undefined;
    description?: string | undefined;
    category?: string | undefined;
    totalValue?: number | undefined;
    totalInstallments?: number | undefined;
}, {
    color?: string | undefined;
    startDate?: string | undefined;
    description?: string | undefined;
    category?: string | undefined;
    totalValue?: string | number | undefined;
    totalInstallments?: string | number | undefined;
}>;
export declare const payInstallmentSchema: z.ZodObject<{
    amount: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number, string | number>>;
}, "strip", z.ZodTypeAny, {
    amount?: number | undefined;
}, {
    amount?: string | number | undefined;
}>;
export type CreateInstallmentInput = z.infer<typeof createInstallmentSchema>;
export type UpdateInstallmentInput = z.infer<typeof updateInstallmentSchema>;
export type PayInstallmentInput = z.infer<typeof payInstallmentSchema>;
//# sourceMappingURL=installment.validation.d.ts.map