export declare class WalletService {
    getAll(userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        value_initial: number;
        color: string;
        icon: string | null;
        balance: number;
        userId: string;
    }[]>;
    getById(id: string, userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        value_initial: number;
        color: string;
        icon: string | null;
        balance: number;
        userId: string;
    }>;
    create(userId: string, data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        value_initial: number;
        color: string;
        icon: string | null;
        balance: number;
        userId: string;
    }>;
    update(id: string, userId: string, data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        value_initial: number;
        color: string;
        icon: string | null;
        balance: number;
        userId: string;
    }>;
    delete(id: string, userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        value_initial: number;
        color: string;
        icon: string | null;
        balance: number;
        userId: string;
    }>;
    updateBalance(id: string, userId: string, amount: number, type: "add" | "subtract"): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        value_initial: number;
        color: string;
        icon: string | null;
        balance: number;
        userId: string;
    }>;
    getStats(userId: string): Promise<import("../repositories/wallet.repository").WalletStats>;
}
export declare const walletService: WalletService;
//# sourceMappingURL=wallet.service.d.ts.map