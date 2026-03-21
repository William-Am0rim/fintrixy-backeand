import { z } from "zod";

export const createGoalSchema = z.object({
  name: z.string().min(1, "Name is required"),
  target: z.union([z.number(), z.string()]).transform(val => {
    if (typeof val === 'string') return parseFloat(val) || 0;
    return val;
  }).refine(val => val > 0, "Target must be positive"),
  current: z.union([z.number(), z.string()]).transform(val => {
    if (typeof val === 'string') return parseFloat(val) || 0;
    return val;
  }).default(0),
  deadline: z.string().min(1, "Deadline is required"),
  color: z.string().min(1, "Color is required"),
  icon: z.string().min(1, "Icon is required"),
});

export const updateGoalSchema = z.object({
  name: z.string().min(1).optional(),
  target: z.union([z.number(), z.string()]).transform(val => {
    if (typeof val === 'string') return parseFloat(val) || 0;
    return val;
  }).optional(),
  current: z.union([z.number(), z.string()]).transform(val => {
    if (typeof val === 'string') return parseFloat(val) || 0;
    return val;
  }).optional(),
  deadline: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
  completed: z.boolean().optional(),
});

export const contributeGoalSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
});

export type CreateGoalInput = z.infer<typeof createGoalSchema>;
export type UpdateGoalInput = z.infer<typeof updateGoalSchema>;
export type ContributeGoalInput = z.infer<typeof contributeGoalSchema>;
