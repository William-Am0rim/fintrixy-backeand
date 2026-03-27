export interface GoalStats {
    total: number;
    completed: number;
    inProgress: number;
    totalTarget: number;
    totalCurrent: number;
    averageProgress: number;
}
export declare class GoalRepository {
    findAll(userId: string): Promise<{
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
    findById(id: string, userId: string): Promise<{
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
    } | null>;
    create(data: any): Promise<{
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
    update(id: string, data: any): Promise<{
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
    delete(id: string): Promise<{
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
    addContribution(id: string, amount: number): Promise<{
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
    getStats(userId: string): Promise<GoalStats>;
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
export declare const goalRepository: GoalRepository;
//# sourceMappingURL=goal.repository.d.ts.map