export declare class TransactionService {
    getAll(userId: string, filters?: any): Promise<({
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
    getById(id: string, userId: string): Promise<{
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
    }>;
    getRecent(userId: string, limit?: number): Promise<({
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
    create(userId: string, data: any): Promise<{
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
    update(id: string, userId: string, data: any): Promise<{
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
    delete(id: string, userId: string): Promise<{
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
    updateWalletBalance(walletId: string, amount: number, type: string, isReverse?: boolean): Promise<void>;
    getStats(userId: string, filters?: any): Promise<import("../repositories/transaction.repository").TransactionStats>;
}
export declare const transactionService: TransactionService;
//# sourceMappingURL=transaction.service.d.ts.map