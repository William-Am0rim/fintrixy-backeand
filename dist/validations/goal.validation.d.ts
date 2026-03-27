import { z } from "zod";
export declare const createGoalSchema: z.ZodObject<{
    name: z.ZodString;
    target: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number, string | number>, number, string | number>;
    current: z.ZodDefault<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number, string | number>>;
    deadline: z.ZodString;
    color: z.ZodString;
    icon: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    color: string;
    icon: string;
    current: number;
    target: number;
    deadline: string;
}, {
    name: string;
    color: string;
    icon: string;
    target: string | number;
    deadline: string;
    current?: string | number | undefined;
}>;
export declare const updateGoalSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    target: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number, string | number>>;
    current: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number, string | number>>;
    deadline: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
    completed: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    color?: string | undefined;
    icon?: string | undefined;
    current?: number | undefined;
    target?: number | undefined;
    deadline?: string | undefined;
    completed?: boolean | undefined;
}, {
    name?: string | undefined;
    color?: string | undefined;
    icon?: string | undefined;
    current?: string | number | undefined;
    target?: string | number | undefined;
    deadline?: string | undefined;
    completed?: boolean | undefined;
}>;
export declare const contributeGoalSchema: z.ZodObject<{
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    amount: number;
}, {
    amount: number;
}>;
export type CreateGoalInput = z.infer<typeof createGoalSchema>;
export type UpdateGoalInput = z.infer<typeof updateGoalSchema>;
export type ContributeGoalInput = z.infer<typeof contributeGoalSchema>;
//# sourceMappingURL=goal.validation.d.ts.map