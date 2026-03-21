import { Response } from "express";
import { goalService } from "../services/goal.service";
import { catchAsync } from "../utils/helpers";

export const getAll = catchAsync(async (req: any, res: Response) => {
  const goals = await goalService.getAll(req.user.id);
  res.json({ success: true, data: goals });
});

export const getById = catchAsync(async (req: any, res: Response) => {
  const goal = await goalService.getById(req.params.id, req.user.id);
  res.json({ success: true, data: goal });
});

export const create = catchAsync(async (req: any, res: Response) => {
  const goal = await goalService.create(req.user.id, req.body);
  res.status(201).json({ success: true, message: "Goal created successfully", data: goal });
});

export const update = catchAsync(async (req: any, res: Response) => {
  const goal = await goalService.update(req.params.id, req.user.id, req.body);
  res.json({ success: true, message: "Goal updated successfully", data: goal });
});

export const remove = catchAsync(async (req: any, res: Response) => {
  await goalService.delete(req.params.id, req.user.id);
  res.json({ success: true, message: "Goal deleted successfully" });
});

export const addContribution = catchAsync(async (req: any, res: Response) => {
  const { amount } = req.body;
  const goal = await goalService.addContribution(req.params.id, req.user.id, amount);
  res.json({ success: true, message: "Contribution added successfully", data: goal });
});

export const getStats = catchAsync(async (req: any, res: Response) => {
  const stats = await goalService.getStats(req.user.id);
  res.json({ success: true, data: stats });
});

export const getOverdue = catchAsync(async (req: any, res: Response) => {
  const goals = await goalService.getOverdue(req.user.id);
  res.json({ success: true, data: goals });
});
