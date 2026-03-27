export declare class BudgetService {
    getAll(userId: string): Promise<{
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
    getById(id: string, userId: string): Promise<{
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
    create(userId: string, data: any): Promise<{
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
    update(id: string, userId: string, data: any): Promise<{
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
    delete(id: string, userId: string): Promise<{
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
    updateSpent(id: string, userId: string, amount: number): Promise<{
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
    resetSpent(id: string, userId: string): Promise<{
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
    getStats(userId: string): Promise<import("../repositories/budget.repository").BudgetStats>;
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
export declare const budgetService: BudgetService;
//# sourceMappingURL=budget.service.d.ts.map