import { Response } from "express";
import { budgetService } from "../services/budget.service";
import { catchAsync } from "../utils/helpers";

export const getAll = catchAsync(async (req: any, res: Response) => {
  const budgets = await budgetService.getAll(req.user.id);
  res.json({ success: true, data: budgets });
});

export const getById = catchAsync(async (req: any, res: Response) => {
  const budget = await budgetService.getById(req.params.id, req.user.id);
  res.json({ success: true, data: budget });
});

export const create = catchAsync(async (req: any, res: Response) => {
  const budget = await budgetService.create(req.user.id, req.body);
  res.status(201).json({ success: true, message: "Budget created successfully", data: budget });
});

export const update = catchAsync(async (req: any, res: Response) => {
  const budget = await budgetService.update(req.params.id, req.user.id, req.body);
  res.json({ success: true, message: "Budget updated successfully", data: budget });
});

export const remove = catchAsync(async (req: any, res: Response) => {
  await budgetService.delete(req.params.id, req.user.id);
  res.json({ success: true, message: "Budget deleted successfully" });
});

export const updateSpent = catchAsync(async (req: any, res: Response) => {
  const { amount } = req.body;
  const budget = await budgetService.updateSpent(req.params.id, req.user.id, amount);
  res.json({ success: true, message: "Spent updated successfully", data: budget });
});

export const resetSpent = catchAsync(async (req: any, res: Response) => {
  const budget = await budgetService.resetSpent(req.params.id, req.user.id);
  res.json({ success: true, message: "Spent reset successfully", data: budget });
});

export const getStats = catchAsync(async (req: any, res: Response) => {
  const stats = await budgetService.getStats(req.user.id);
  res.json({ success: true, data: stats });
});

export const getExceeded = catchAsync(async (req: any, res: Response) => {
  const budgets = await budgetService.getExceeded(req.user.id);
  res.json({ success: true, data: budgets });
});
