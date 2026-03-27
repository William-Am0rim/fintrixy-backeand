export declare class GoalService {
    getAll(userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        icon: string;
        userId: string;
        current: number;
        target: number;
        deadline: Date;
        completed: boolean;
    }[]>;
    getById(id: string, userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        icon: string;
        userId: string;
        current: number;
        target: number;
        deadline: Date;
        completed: boolean;
    }>;
    create(userId: string, data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        icon: string;
        userId: string;
        current: number;
        target: number;
        deadline: Date;
        completed: boolean;
    }>;
    update(id: string, userId: string, data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        icon: string;
        userId: string;
        current: number;
        target: number;
        deadline: Date;
        completed: boolean;
    }>;
    delete(id: string, userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        icon: string;
        userId: string;
        current: number;
        target: number;
        deadline: Date;
        completed: boolean;
    }>;
    addContribution(id: string, userId: string, amount: number): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        icon: string;
        userId: string;
        current: number;
        target: number;
        deadline: Date;
        completed: boolean;
    }>;
    getStats(userId: string): Promise<import("../repositories/goal.repository").GoalStats>;
    getOverdue(userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        icon: string;
        userId: string;
        current: number;
        target: number;
        deadline: Date;
        completed: boolean;
    }[]>;
}
export declare const goalService: GoalService;
//# sourceMappingURL=goal.service.d.ts.map