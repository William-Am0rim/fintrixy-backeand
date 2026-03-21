import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { catchAsync } from "../utils/helpers";

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  res.status(201).json({ success: true, message: "User registered successfully", data: result });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  res.json({ success: true, message: "Login successful", data: result });
});

export const getProfile = catchAsync(async (req: any, res: Response) => {
  const user = await authService.getProfile(req.user.id);
  res.json({ success: true, data: user });
});

export const updateProfile = catchAsync(async (req: any, res: Response) => {
  const user = await authService.updateProfile(req.user.id, req.body);
  res.json({ success: true, message: "Profile updated successfully", data: user });
});

export const changePassword = catchAsync(async (req: any, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const result = await authService.changePassword(req.user.id, currentPassword, newPassword);
  res.json({ success: true, data: result });
});
