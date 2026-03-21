import { z } from "zod";

export const createRecurrenceSchema = z.object({
  description: z.string().min(1, "Description is required"),
  value: z.number().positive("Value must be positive"),
  type: z.enum(["income", "expense"]),
  frequency: z.enum(["daily", "weekly", "monthly", "yearly"]),
  nextDate: z.string().or(z.date()),
  wallet_id: z.string().uuid("Invalid wallet ID"),
  category: z.string().min(1, "Category is required"),
  color: z.string().min(1, "Color is required"),
});

export const updateRecurrenceSchema = z.object({
  description: z.string().min(1).optional(),
  value: z.number().positive().optional(),
  type: z.enum(["income", "expense"]).optional(),
  frequency: z.enum(["daily", "weekly", "monthly", "yearly"]).optional(),
  nextDate: z.string().or(z.date()).optional(),
  wallet_id: z.string().uuid().optional(),
  category: z.string().optional(),
  color: z.string().optional(),
  active: z.boolean().optional(),
});

export type CreateRecurrenceInput = z.infer<typeof createRecurrenceSchema>;
export type UpdateRecurrenceInput = z.infer<typeof updateRecurrenceSchema>;
