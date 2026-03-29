import { Response } from "express";
import { subscriptionService } from "../services/subscription.service";
import { catchAsync } from "../utils/helpers";

export const getSubscription = catchAsync(async (req: any, res: Response) => {
  const userId = req.user.id;
  const subscription = await subscriptionService.getSubscription(userId);
  res.json({ success: true, data: subscription });
});

export const getPlanLimits = catchAsync(async (req: any, res: Response) => {
  const userId = req.user.id;
  const limits = await subscriptionService.getPlanLimits(userId);
  res.json({ success: true, data: limits });
});

export const upgradeToPro = catchAsync(async (req: any, res: Response) => {
  const userId = req.user.id;
  const subscription = await subscriptionService.upgradeToPro(userId, req.body);
  res.json({ success: true, data: subscription });
});

export const downgradeToFree = catchAsync(async (req: any, res: Response) => {
  const userId = req.user.id;
  const subscription = await subscriptionService.downgradeToFree(userId);
  res.json({ success: true, data: subscription });
});

export const getStats = catchAsync(async (req: any, res: Response) => {
  const userId = req.user.id;
  const stats = await subscriptionService.getStats(userId);
  res.json({ success: true, data: stats });
});

export const checkLimit = catchAsync(async (req: any, res: Response) => {
  const userId = req.user.id;
  const { type } = req.query;
  
  if (!type || !["wallets", "transactions", "recurrences", "goals", "installments", "budgets"].includes(type as string)) {
    return res.status(400).json({ 
      success: false, 
      error: "Tipo inválido. Use: wallets, transactions, recurrences, goals, installments, budgets" 
    });
  }
  
  const result = await subscriptionService.checkLimit(userId, type as any);
  res.json({ success: true, data: result });
});

export const confirmPayment = catchAsync(async (req: any, res: Response) => {
  const userId = req.user.id;
  const { billingId } = req.body;
  
  if (!billingId) {
    return res.status(400).json({ 
      success: false, 
      error: "billingId é obrigatório" 
    });
  }
  
  const subscription = await subscriptionService.confirmPayment(userId, billingId);
  res.json({ success: true, data: subscription });
});
