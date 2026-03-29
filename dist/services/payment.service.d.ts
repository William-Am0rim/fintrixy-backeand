export interface PaymentResult {
    success: boolean;
    data?: any;
    error?: string;
    message?: string;
}
export declare const paymentService: {
    createPixCharge(amount: number, userId: string, plan: string): Promise<PaymentResult>;
    getPaymentStatus(billingId: string): Promise<PaymentResult>;
    processWebhook(payload: any): Promise<{
        success: boolean;
        error?: string;
    }>;
};
//# sourceMappingURL=payment.service.d.ts.map