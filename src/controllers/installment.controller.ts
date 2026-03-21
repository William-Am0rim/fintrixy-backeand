import { Response } from "express";
import { installmentService } from "../services/installment.service";
import { catchAsync } from "../utils/helpers";

export const getAll = catchAsync(async (req: any, res: Response) => {
  const installments = await installmentService.getAll(req.user.id);
  res.json({ success: true, data: installments });
});

export const getById = catchAsync(async (req: any, res: Response) => {
  const installment = await installmentService.getById(req.params.id, req.user.id);
  res.json({ success: true, data: installment });
});

export const getActive = catchAsync(async (req: any, res: Response) => {
  const installments = await installmentService.getActive(req.user.id);
  res.json({ success: true, data: installments });
});

export const getCompleted = catchAsync(async (req: any, res: Response) => {
  const installments = await installmentService.getCompleted(req.user.id);
  res.json({ success: true, data: installments });
});

export const create = catchAsync(async (req: any, res: Response) => {
  const installment = await installmentService.create(req.user.id, req.body);
  res.status(201).json({ success: true, message: "Installment created successfully", data: installment });
});

export const update = catchAsync(async (req: any, res: Response) => {
  const installment = await installmentService.update(req.params.id, req.user.id, req.body);
  res.json({ success: true, message: "Installment updated successfully", data: installment });
});

export const remove = catchAsync(async (req: any, res: Response) => {
  await installmentService.delete(req.params.id, req.user.id);
  res.json({ success: true, message: "Installment deleted successfully" });
});

export const payInstallment = catchAsync(async (req: any, res: Response) => {
  const { amount } = req.body;
  const installment = await installmentService.payInstallment(req.params.id, req.user.id, amount);
  res.json({ success: true, message: "Installment paid successfully", data: installment });
});

export const getStats = catchAsync(async (req: any, res: Response) => {
  const stats = await installmentService.getStats(req.user.id);
  res.json({ success: true, data: stats });
});

export const getUpcoming = catchAsync(async (req: any, res: Response) => {
  const days = parseInt(req.query.days as string) || 7;
  const installments = await installmentService.getUpcoming(req.user.id, days);
  res.json({ success: true, data: installments });
});

export const getOverdue = catchAsync(async (req: any, res: Response) => {
  const installments = await installmentService.getOverdue(req.user.id);
  res.json({ success: true, data: installments });
});
