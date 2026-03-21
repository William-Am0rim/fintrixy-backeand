import { z } from "zod";

export const createWalletSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  value_initial: z.union([z.number(), z.string()]).transform(val => {
    if (typeof val === 'string') return parseFloat(val) || 0;
    return val;
  }).default(0),
  color: z.string().min(1, "Color is required"),
  icon: z.string().optional(),
});

export const updateWalletSchema = z.object({
  name: z.string().min(1).optional(),
  type: z.string().min(1).optional(),
  balance: z.number().optional(),
  color: z.string().optional(),
  icon: z.string().optional().nullable(),
});

export type CreateWalletInput = z.infer<typeof createWalletSchema>;
export type UpdateWalletInput = z.infer<typeof updateWalletSchema>;
