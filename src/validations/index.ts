import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqAny = req as Record<string, any>;
      const data = ["body", "query", "params"].reduce((acc: any, key) => {
        if (reqAny[key] && Object.keys(reqAny[key]).length > 0) {
          acc[key] = reqAny[key];
        }
        return acc;
      }, {});

      const bodyData = data.body || {};
      const result = schema.safeParse(bodyData);

      if (!result.success) {
        const errors = result.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors,
        });
      }

      req.body = result.data;
      req.query = data.query || req.query;
      req.params = data.params || req.params;

      next();
    } catch (error) {
      next(error);
    }
  };
};
