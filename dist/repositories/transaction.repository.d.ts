export interface TransactionFilters {
    search?: string;
    type?: string;
    category?: string;
    wallet_id?: string;
    paid?: boolean;
    date_from?: string;
    date_to?: string;
}
export interface TransactionStats {
    total: number;
    income: number;
    expense: number;
    transfer: number;
    paidCount: number;
    unpaidCount: number;
    byCategory: {
        category: string;
        total: number;
    }[];
}
export declare class TransactionRepository {
    findAll(userId: string, filters?: TransactionFilters): Promise<({
        wallet: {
            id: string;
            name: string;
            color: string;
        };
        walletTo: {
            id: string;
            name: string;
            color: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: number;
        type: string;
        color: string | null;
        userId: string;
        description: string;
        category: string;
        date: Date;
        paid: boolean;
        walletId: string;
        walletToId: string | null;
    })[]>;
    findById(id: string, userId: string): Promise<({
        wallet: {
            id: string;
            name: string;
            color: string;
        };
        walletTo: {
            id: string;
            name: string;
            color: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: number;
        type: string;
        color: string | null;
        userId: string;
        description: string;
        category: string;
        date: Date;
        paid: boolean;
        walletId: string;
        walletToId: string | null;
    }) | null>;
    findRecent(userId: string, limit?: number): Promise<({
        wallet: {
            id: string;
            name: string;
            color: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: number;
        type: string;
        color: string | null;
        userId: string;
        description: string;
        category: string;
        date: Date;
        paid: boolean;
        walletId: string;
        walletToId: string | null;
    })[]>;
    create(data: any): Promise<{
        wallet: {
            id: string;
            name: string;
            color: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: number;
        type: string;
        color: string | null;
        userId: string;
        description: string;
        category: string;
        date: Date;
        paid: boolean;
        walletId: string;
        walletToId: string | null;
    }>;
    update(id: string, data: any): Promise<{
        wallet: {
            id: string;
            name: string;
            color: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: number;
        type: string;
        color: string | null;
        userId: string;
        description: string;
        category: string;
        date: Date;
        paid: boolean;
        walletId: string;
        walletToId: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: number;
        type: string;
        color: string | null;
        userId: string;
        description: string;
        category: string;
        date: Date;
        paid: boolean;
        walletId: string;
        walletToId: string | null;
    }>;
    getStats(userId: string, filters?: TransactionFilters): Promise<TransactionStats>;
}
export declare const transactionRepository: TransactionRepository;
//# sourceMappingURL=transaction.repository.d.ts.map