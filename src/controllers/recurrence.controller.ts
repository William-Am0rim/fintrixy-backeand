import { Response } from "express";
import { recurrenceService } from "../services/recurrence.service";
import { catchAsync } from "../utils/helpers";

export const getAll = catchAsync(async (req: any, res: Response) => {
  const recurrences = await recurrenceService.getAll(req.user.id);
  res.json({ success: true, data: recurrences });
});

export const getById = catchAsync(async (req: any, res: Response) => {
  const recurrence = await recurrenceService.getById(req.params.id, req.user.id);
  res.json({ success: true, data: recurrence });
});

export const getActive = catchAsync(async (req: any, res: Response) => {
  const recurrences = await recurrenceService.getActive(req.user.id);
  res.json({ success: true, data: recurrences });
});

export const getInactive = catchAsync(async (req: any, res: Response) => {
  const recurrences = await recurrenceService.getInactive(req.user.id);
  res.json({ success: true, data: recurrences });
});

export const create = catchAsync(async (req: any, res: Response) => {
  const recurrence = await recurrenceService.create(req.user.id, req.body);
  res.status(201).json({ success: true, message: "Recurrence created successfully", data: recurrence });
});

export const update = catchAsync(async (req: any, res: Response) => {
  const recurrence = await recurrenceService.update(req.params.id, req.user.id, req.body);
  res.json({ success: true, message: "Recurrence updated successfully", data: recurrence });
});

export const remove = catchAsync(async (req: any, res: Response) => {
  await recurrenceService.delete(req.params.id, req.user.id);
  res.json({ success: true, message: "Recurrence deleted successfully" });
});

export const toggleActive = catchAsync(async (req: any, res: Response) => {
  const recurrence = await recurrenceService.toggleActive(req.params.id, req.user.id);
  res.json({ success: true, message: "Recurrence toggled successfully", data: recurrence });
});

export const processNow = catchAsync(async (req: any, res: Response) => {
  const recurrence = await recurrenceService.processNow(req.params.id, req.user.id);
  res.json({ success: true, message: "Recurrence processed successfully", data: recurrence });
});

export const skipNext = catchAsync(async (req: any, res: Response) => {
  const recurrence = await recurrenceService.skipNext(req.params.id, req.user.id);
  res.json({ success: true, message: "Next occurrence skipped successfully", data: recurrence });
});

export const getStats = catchAsync(async (req: any, res: Response) => {
  const stats = await recurrenceService.getStats(req.user.id);
  res.json({ success: true, data: stats });
});

export const getUpcoming = catchAsync(async (req: any, res: Response) => {
  const days = parseInt(req.query.days as string) || 7;
  const recurrences = await recurrenceService.getUpcoming(req.user.id, days);
  res.json({ success: true, data: recurrences });
});
