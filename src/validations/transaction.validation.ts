import { z } from "zod";

export const createTransactionSchema = z.object({
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  value: z.union([z.number(), z.string()]).transform(val => {
    if (typeof val === 'string') return parseFloat(val) || 0;
    return val;
  }).refine(val => val > 0, "Value must be positive"),
  type: z.enum(["income", "expense", "transfer"]),
  date: z.string().or(z.date()),
  wallet_id: z.string().min(1, "Wallet is required"),
  wallet_to_id: z.string().optional().nullable(),
  paid: z.boolean().default(true),
  color: z.string().optional(),
});

export const updateTransactionSchema = z.object({
  description: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  value: z.union([z.number(), z.string()]).transform(val => {
    if (typeof val === 'string') return parseFloat(val) || 0;
    return val;
  }).optional(),
  type: z.enum(["income", "expense", "transfer"]).optional(),
  date: z.string().or(z.date()).optional(),
  wallet_id: z.string().optional(),
  wallet_to_id: z.string().optional().nullable(),
  paid: z.boolean().optional(),
  color: z.string().optional(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
