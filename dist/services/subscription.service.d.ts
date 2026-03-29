export declare const PLAN_PRICES: {
    pro: number;
};
export declare const PLAN_LIMITS: {
    free: {
        wallets: number;
        transactions: number;
        recurrences: number;
        goals: number;
        installments: number;
        budgets: number;
    };
    pro: {
        wallets: number;
        transactions: number;
        recurrences: number;
        goals: number;
        installments: number;
        budgets: number;
    };
};
export declare class SubscriptionService {
    getSubscription(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        userId: string;
        plan: string;
        startDate: Date;
        endDate: Date | null;
        paymentMethod: string | null;
        transactionId: string | null;
    }>;
    getPlanLimits(userId: string): Promise<{
        plan: string;
        limits: {
            wallets: number;
            transactions: number;
            recurrences: number;
            goals: number;
            installments: number;
            budgets: number;
        } | {
            wallets: number;
            transactions: number;
            recurrences: number;
            goals: number;
            installments: number;
            budgets: number;
        };
    }>;
    checkLimit(userId: string, type: keyof typeof PLAN_LIMITS.free): Promise<{
        allowed: boolean;
        plan: string;
        current?: undefined;
        limit?: undefined;
        type?: undefined;
    } | {
        allowed: boolean;
        plan: string;
        current: number;
        limit: number;
        type: "wallets" | "transactions" | "goals" | "budgets" | "installments" | "recurrences";
    } | {
        allowed: boolean;
        plan: string;
        current: number;
        limit: number;
        type?: undefined;
    }>;
    upgradeToPro(userId: string, paymentData?: any): Promise<{
        paymentUrl: any;
        billingId: any;
    }>;
    confirmPayment(userId: string, billingId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        userId: string;
        plan: string;
        startDate: Date;
        endDate: Date | null;
        paymentMethod: string | null;
        transactionId: string | null;
    }>;
    downgradeToFree(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        userId: string;
        plan: string;
        startDate: Date;
        endDate: Date | null;
        paymentMethod: string | null;
        transactionId: string | null;
    }>;
    getStats(userId: string): Promise<{
        plan: string;
        status: string;
        stats: {
            wallets: {
                current: number;
                limit: number;
            };
            transactions: {
                current: number;
                limit: number;
            };
            recurrences: {
                current: number;
                limit: number;
            };
            goals: {
                current: number;
                limit: number;
            };
            installments: {
                current: number;
                limit: number;
            };
            budgets: {
                current: number;
                limit: number;
            };
        };
    }>;
}
export declare const subscriptionService: SubscriptionService;
//# sourceMappingURL=subscription.service.d.ts.map