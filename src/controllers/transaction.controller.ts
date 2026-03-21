import { Request, Response } from "express";
import { transactionService } from "../services/transaction.service";
import { catchAsync } from "../utils/helpers";

export const getAll = catchAsync(async (req: any, res: Response) => {
  const transactions = await transactionService.getAll(req.user.id, req.query);
  res.json({ success: true, data: transactions });
});

export const getById = catchAsync(async (req: any, res: Response) => {
  const transaction = await transactionService.getById(req.params.id, req.user.id);
  res.json({ success: true, data: transaction });
});

export const getRecent = catchAsync(async (req: any, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const transactions = await transactionService.getRecent(req.user.id, limit);
  res.json({ success: true, data: transactions });
});

export const create = catchAsync(async (req: any, res: Response) => {
  console.log("Transaction controller - user:", req.user);
  console.log("Transaction controller - body:", req.body);
  const transaction = await transactionService.create(req.user.id, req.body);
  res.status(201).json({ success: true, message: "Transaction created successfully", data: transaction });
});

export const update = catchAsync(async (req: any, res: Response) => {
  const transaction = await transactionService.update(req.params.id, req.user.id, req.body);
  res.json({ success: true, message: "Transaction updated successfully", data: transaction });
});

export const remove = catchAsync(async (req: any, res: Response) => {
  await transactionService.delete(req.params.id, req.user.id);
  res.json({ success: true, message: "Transaction deleted successfully" });
});

export const getStats = catchAsync(async (req: any, res: Response) => {
  const stats = await transactionService.getStats(req.user.id, req.query);
  res.json({ success: true, data: stats });
});
