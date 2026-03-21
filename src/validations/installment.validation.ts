import { z } from "zod";

export const createInstallmentSchema = z.object({
  description: z.string().min(1, "Description is required"),
  totalValue: z.union([z.number(), z.string()]).transform(val => {
    if (typeof val === 'string') return parseFloat(val) || 0;
    return val;
  }).refine(val => val > 0, "Total value must be positive"),
  totalInstallments: z.union([z.number(), z.string()]).transform(val => {
    if (typeof val === 'string') return parseInt(val) || 1;
    return val;
  }).refine(val => val >= 1, "Total installments must be at least 1"),
  startDate: z.string().min(1, "Start date is required"),
  category: z.string().min(1, "Category is required"),
  color: z.string().min(1, "Color is required"),
});

export const updateInstallmentSchema = z.object({
  description: z.string().min(1).optional(),
  totalValue: z.union([z.number(), z.string()]).transform(val => {
    if (typeof val === 'string') return parseFloat(val) || 0;
    return val;
  }).optional(),
  totalInstallments: z.union([z.number(), z.string()]).transform(val => {
    if (typeof val === 'string') return parseInt(val) || 1;
    return val;
  }).optional(),
  startDate: z.string().optional(),
  category: z.string().optional(),
  color: z.string().optional(),
});

export const payInstallmentSchema = z.object({
  amount: z.union([z.number(), z.string()]).transform(val => {
    if (typeof val === 'string') return parseFloat(val) || 0;
    return val;
  }).optional(),
});

export type CreateInstallmentInput = z.infer<typeof createInstallmentSchema>;
export type UpdateInstallmentInput = z.infer<typeof updateInstallmentSchema>;
export type PayInstallmentInput = z.infer<typeof payInstallmentSchema>;
