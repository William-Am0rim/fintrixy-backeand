export declare class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    constructor(message: string, statusCode: number);
}
export declare const catchAsync: <T>(fn: (req: any, res: any, next: any) => Promise<T>) => (req: any, res: any, next: any) => void;
export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: any[];
}
export declare const response: {
    success: <T>(res: any, data: T, message?: string, statusCode?: number) => any;
    created: <T>(res: any, data: T, message?: string) => any;
    error: (res: any, message?: string, statusCode?: number, errors?: any) => any;
    paginated: <T>(res: any, data: T, pagination: any) => any;
};
//# sourceMappingURL=helpers.d.ts.map