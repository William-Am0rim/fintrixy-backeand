import { Request, Response } from "express";
import { walletService } from "../services/wallet.service";
import { catchAsync } from "../utils/helpers";

export const getAll = catchAsync(async (req: any, res: Response) => {
  const wallets = await walletService.getAll(req.user.id);
  res.json({ success: true, data: wallets });
});

export const getById = catchAsync(async (req: any, res: Response) => {
  const wallet = await walletService.getById(req.params.id, req.user.id);
  res.json({ success: true, data: wallet });
});

export const create = catchAsync(async (req: any, res: Response) => {
  const wallet = await walletService.create(req.user.id, req.body);
  res.status(201).json({ success: true, message: "Wallet created successfully", data: wallet });
});

export const update = catchAsync(async (req: any, res: Response) => {
  const wallet = await walletService.update(req.params.id, req.user.id, req.body);
  res.json({ success: true, message: "Wallet updated successfully", data: wallet });
});

export const remove = catchAsync(async (req: any, res: Response) => {
  await walletService.delete(req.params.id, req.user.id);
  res.json({ success: true, message: "Wallet deleted successfully" });
});

export const getStats = catchAsync(async (req: any, res: Response) => {
  const stats = await walletService.getStats(req.user.id);
  res.json({ success: true, data: stats });
});

export const updateBalance = catchAsync(async (req: any, res: Response) => {
  const { amount, type } = req.body;
  const wallet = await walletService.updateBalance(req.params.id, req.user.id, amount, type);
  res.json({ success: true, message: "Balance updated successfully", data: wallet });
});
