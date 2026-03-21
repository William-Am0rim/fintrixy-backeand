export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const catchAsync = <T>(
  fn: (req: any, res: any, next: any) => Promise<T>
) => {
  return (req: any, res: any, next: any) => {
    fn(req, res, next).catch(next);
  };
};

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}

export const response = {
  success: <T>(res: any, data: T, message = "Success", statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    } as ApiResponse<T>);
  },

  created: <T>(res: any, data: T, message = "Created successfully") => {
    return res.status(201).json({
      success: true,
      message,
      data,
    } as ApiResponse<T>);
  },

  error: (res: any, message = "Error", statusCode = 500, errors: any = null) => {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    } as ApiResponse<null>);
  },

  paginated: <T>(res: any, data: T, pagination: any) => {
    return res.status(200).json({
      success: true,
      data,
      pagination,
    } as ApiResponse<T> & { pagination: any });
  },
};
