import { z } from "zod";

export const createBudgetSchema = z.object({
  category: z.string().min(1, "Category is required"),
  limit: z.union([z.number(), z.string()]).transform(val => {
    if (typeof val === 'string') return parseFloat(val) || 0;
    return val;
  }).refine(val => val > 0, "Limit must be positive"),
  spent: z.union([z.number(), z.string()]).transform(val => {
    if (typeof val === 'string') return parseFloat(val) || 0;
    return val;
  }).default(0),
  color: z.string().min(1, "Color is required"),
  icon: z.string().min(1, "Icon is required"),
});

export const updateBudgetSchema = z.object({
  category: z.string().min(1).optional(),
  limit: z.union([z.number(), z.string()]).transform(val => {
    if (typeof val === 'string') return parseFloat(val) || 0;
    return val;
  }).optional(),
  spent: z.union([z.number(), z.string()]).transform(val => {
    if (typeof val === 'string') return parseFloat(val) || 0;
    return val;
  }).optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
});

export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;
export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>;
