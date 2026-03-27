import { z } from "zod";
export declare const createRecurrenceSchema: z.ZodObject<{
    description: z.ZodString;
    value: z.ZodNumber;
    type: z.ZodEnum<["income", "expense"]>;
    frequency: z.ZodEnum<["daily", "weekly", "monthly", "yearly"]>;
    nextDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    wallet_id: z.ZodString;
    category: z.ZodString;
    color: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: number;
    type: "income" | "expense";
    color: string;
    description: string;
    category: string;
    wallet_id: string;
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    nextDate: string | Date;
}, {
    value: number;
    type: "income" | "expense";
    color: string;
    description: string;
    category: string;
    wallet_id: string;
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    nextDate: string | Date;
}>;
export declare const updateRecurrenceSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodEnum<["income", "expense"]>>;
    frequency: z.ZodOptional<z.ZodEnum<["daily", "weekly", "monthly", "yearly"]>>;
    nextDate: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodDate]>>;
    wallet_id: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    active: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    value?: number | undefined;
    type?: "income" | "expense" | undefined;
    color?: string | undefined;
    active?: boolean | undefined;
    description?: string | undefined;
    category?: string | undefined;
    wallet_id?: string | undefined;
    frequency?: "daily" | "weekly" | "monthly" | "yearly" | undefined;
    nextDate?: string | Date | undefined;
}, {
    value?: number | undefined;
    type?: "income" | "expense" | undefined;
    color?: string | undefined;
    active?: boolean | undefined;
    description?: string | undefined;
    category?: string | undefined;
    wallet_id?: string | undefined;
    frequency?: "daily" | "weekly" | "monthly" | "yearly" | undefined;
    nextDate?: string | Date | undefined;
}>;
export type CreateRecurrenceInput = z.infer<typeof createRecurrenceSchema>;
export type UpdateRecurrenceInput = z.infer<typeof updateRecurrenceSchema>;
//# sourceMappingURL=recurrence.validation.d.ts.map