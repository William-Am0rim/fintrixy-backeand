"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletRepository = exports.WalletRepository = void 0;
const database_1 = __importDefault(require("../config/database"));
class WalletRepository {
    async findAll(userId) {
        return database_1.default.wallet.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
    }
    async findById(id, userId) {
        return database_1.default.wallet.findFirst({
            where: { id, userId },
        });
    }
    async create(data) {
        return database_1.default.wallet.create({
            data,
        });
    }
    async update(id, data) {
        return database_1.default.wallet.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return database_1.default.wallet.delete({
            where: { id },
        });
    }
    async updateBalance(id, amount, type) {
        const wallet = await database_1.default.wallet.findUnique({ where: { id } });
        if (!wallet)
            throw new Error("Wallet not found");
        const newBalance = type === "add" ? wallet.balance + amount : wallet.balance - amount;
        return database_1.default.wallet.update({
            where: { id },
            data: { balance: newBalance },
        });
    }
    async getStats(userId) {
        const wallets = await database_1.default.wallet.findMany({
            where: { userId },
        });
        const total = wallets.reduce((sum, w) => sum + w.balance, 0);
        const positive = wallets.filter((w) => w.balance > 0).reduce((sum, w) => sum + w.balance, 0);
        const negative = wallets.filter((w) => w.balance < 0).reduce((sum, w) => sum + Math.abs(w.balance), 0);
        const byType = wallets.reduce((acc, w) => {
            const existing = acc.find((t) => t.type === w.type);
            if (existing) {
                existing.count += 1;
                existing.total += w.balance;
            }
            else {
                acc.push({ type: w.type, count: 1, total: w.balance });
            }
            return acc;
        }, []);
        return { total, count: wallets.length, totalIncome: positive, totalExpense: negative, byType };
    }
}
exports.WalletRepository = WalletRepository;
exports.walletRepository = new WalletRepository();
//# sourceMappingURL=wallet.repository.js.map