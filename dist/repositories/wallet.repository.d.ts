import { Wallet } from "@prisma/client";
export interface CreateWalletData {
    name: string;
    type: string;
    balance?: number;
    color: string;
    icon?: string;
    userId: string;
}
export interface UpdateWalletData {
    name?: string;
    type?: string;
    balance?: number;
    color?: string;
    icon?: string | null;
}
export interface WalletStats {
    total: number;
    count: number;
    totalIncome: number;
    totalExpense: number;
    byType: {
        type: string;
        count: number;
        total: number;
    }[];
}
export declare class WalletRepository {
    findAll(userId: string): Promise<Wallet[]>;
    findById(id: string, userId: string): Promise<Wallet | null>;
    create(data: CreateWalletData): Promise<Wallet>;
    update(id: string, data: UpdateWalletData): Promise<Wallet>;
    delete(id: string): Promise<Wallet>;
    updateBalance(id: string, amount: number, type: "add" | "subtract"): Promise<Wallet>;
    getStats(userId: string): Promise<WalletStats>;
}
export declare const walletRepository: WalletRepository;
//# sourceMappingURL=wallet.repository.d.ts.map