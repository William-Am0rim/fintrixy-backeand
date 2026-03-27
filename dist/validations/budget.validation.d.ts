import { z } from "zod";
export declare const createBudgetSchema: z.ZodObject<{
    category: z.ZodString;
    limit: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number, string | number>, number, string | number>;
    spent: z.ZodDefault<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number, string | number>>;
    color: z.ZodString;
    icon: z.ZodString;
}, "strip", z.ZodTypeAny, {
    color: string;
    icon: string;
    category: string;
    limit: number;
    spent: number;
}, {
    color: string;
    icon: string;
    category: string;
    limit: string | number;
    spent?: string | number | undefined;
}>;
export declare const updateBudgetSchema: z.ZodObject<{
    category: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number, string | number>>;
    spent: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number, string | number>>;
    color: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    color?: string | undefined;
    icon?: string | undefined;
    category?: string | undefined;
    limit?: number | undefined;
    spent?: number | undefined;
}, {
    color?: string | undefined;
    icon?: string | undefined;
    category?: string | undefined;
    limit?: string | number | undefined;
    spent?: string | number | undefined;
}>;
export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;
export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>;
//# sourceMappingURL=budget.validation.d.ts.map