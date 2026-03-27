export declare class SubscriptionRepository {
    findByUserId(userId: string): Promise<{
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
    } | null>;
    create(userId: string, data: any): Promise<{
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
    update(userId: string, data: any): Promise<{
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
    upsert(userId: string, data: any): Promise<{
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
    delete(userId: string): Promise<{
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
    countWallets(userId: string): Promise<number>;
    countTransactions(userId: string): Promise<number>;
    countRecurrences(userId: string): Promise<number>;
    countGoals(userId: string): Promise<number>;
    countInstallments(userId: string): Promise<number>;
    countBudgets(userId: string): Promise<number>;
}
export declare const subscriptionRepository: SubscriptionRepository;
//# sourceMappingURL=subscription.repository.d.ts.map