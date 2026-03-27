export interface BudgetStats {
    total: number;
    exceeded: number;
    withinLimit: number;
    totalLimit: number;
    totalSpent: number;
    totalRemaining: number;
    averagePercentage: number;
}
export declare class BudgetRepository {
    findAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        icon: string;
        userId: string;
        category: string;
        limit: number;
        spent: number;
    }[]>;
    findById(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        icon: string;
        userId: string;
        category: string;
        limit: number;
        spent: number;
    } | null>;
    findByCategory(category: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        icon: string;
        userId: string;
        category: string;
        limit: number;
        spent: number;
    } | null>;
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        icon: string;
        userId: string;
        category: string;
        limit: number;
        spent: number;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        icon: string;
        userId: string;
        category: string;
        limit: number;
        spent: number;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        icon: string;
        userId: string;
        category: string;
        limit: number;
        spent: number;
    }>;
    updateSpent(id: string, amount: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        icon: string;
        userId: string;
        category: string;
        limit: number;
        spent: number;
    }>;
    resetSpent(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        icon: string;
        userId: string;
        category: string;
        limit: number;
        spent: number;
    }>;
    getStats(userId: string): Promise<BudgetStats>;
    getExceeded(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        icon: string;
        userId: string;
        category: string;
        limit: number;
        spent: number;
    }[]>;
}
export declare const budgetRepository: BudgetRepository;
//# sourceMappingURL=budget.repository.d.ts.map