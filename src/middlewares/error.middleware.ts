import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { config } from "../config";

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}

export const globalErrorHandler = (
  err: Error | AppError | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  if (config.nodeEnv === "development") {
    console.error("ERROR 💥:", err);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      error = new AppError("Duplicate field value entered", 400);
    }
    if (err.code === "P2025") {
      error = new AppError("Record not found", 404);
    }
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || "Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(config.nodeEnv === "development" && { stack: err.stack }),
  });
};

export const notFound = (req: Request, res: Response) => {
  const error = new AppError(`Not Found - ${req.originalUrl}`, 404);
  res.status(404);
  res.json({
    success: false,
    message: error.message,
  });
};
