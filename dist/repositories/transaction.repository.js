"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRepository = exports.TransactionRepository = void 0;
const database_1 = __importDefault(require("../config/database"));
class TransactionRepository {
    async findAll(userId, filters = {}) {
        const where = { userId };
        if (filters.search) {
            where.description = { contains: filters.search, mode: "insensitive" };
        }
        if (filters.type && filters.type !== "all")
            where.type = filters.type;
        if (filters.category)
            where.category = { contains: filters.category, mode: "insensitive" };
        if (filters.wallet_id)
            where.walletId = filters.wallet_id;
        if (filters.paid !== undefined)
            where.paid = filters.paid;
        if (filters.date_from && filters.date_to) {
            where.date = { gte: new Date(filters.date_from), lte: new Date(filters.date_to) };
        }
        return database_1.default.transaction.findMany({
            where,
            include: {
                wallet: { select: { id: true, name: true, color: true } },
                walletTo: { select: { id: true, name: true, color: true } },
            },
            orderBy: { date: "desc" },
        });
    }
    async findById(id, userId) {
        return database_1.default.transaction.findFirst({
            where: { id, userId },
            include: {
                wallet: { select: { id: true, name: true, color: true } },
                walletTo: { select: { id: true, name: true, color: true } },
            },
        });
    }
    async findRecent(userId, limit = 10) {
        return database_1.default.transaction.findMany({
            where: { userId },
            include: { wallet: { select: { id: true, name: true, color: true } } },
            orderBy: { createdAt: "desc" },
            take: limit,
        });
    }
    async create(data) {
        const { wallet_id, ...rest } = data;
        return database_1.default.transaction.create({
            data: {
                ...rest,
                date: new Date(data.date),
                walletId: wallet_id || data.walletId,
            },
            include: { wallet: { select: { id: true, name: true, color: true } } },
        });
    }
    async update(id, data) {
        const { wallet_id, ...rest } = data;
        const updateData = { ...rest };
        if (data.date)
            updateData.date = new Date(data.date);
        if (wallet_id)
            updateData.walletId = wallet_id;
        return database_1.default.transaction.update({
            where: { id },
            data: updateData,
            include: { wallet: { select: { id: true, name: true, color: true } } },
        });
    }
    async delete(id) {
        return database_1.default.transaction.delete({ where: { id } });
    }
    async getStats(userId, filters = {}) {
        const where = { userId };
        if (filters.date_from && filters.date_to) {
            where.date = { gte: new Date(filters.date_from), lte: new Date(filters.date_to) };
        }
        const [typeGroup, paidGroup, categoryGroup] = await Promise.all([
            database_1.default.transaction.groupBy({
                by: ['type'],
                where,
                _sum: { value: true },
            }),
            database_1.default.transaction.groupBy({
                by: ['paid'],
                where,
                _count: { _all: true },
            }),
            database_1.default.transaction.groupBy({
                by: ['category'],
                where,
                _sum: { value: true },
            })
        ]);
        let income = 0;
        let expense = 0;
        let transfer = 0;
        typeGroup.forEach((g) => {
            if (g.type === "income")
                income = g._sum.value || 0;
            if (g.type === "expense")
                expense = g._sum.value || 0;
            if (g.type === "transfer")
                transfer = g._sum.value || 0;
        });
        const total = income + expense + transfer;
        let paidCount = 0;
        let unpaidCount = 0;
        paidGroup.forEach((g) => {
            if (g.paid)
                paidCount = g._count._all;
            else
                unpaidCount = g._count._all;
        });
        const byCategory = categoryGroup.map((g) => ({
            category: g.category,
            total: g._sum.value || 0,
        })).sort((a, b) => b.total - a.total);
        return { total, income, expense, transfer, paidCount, unpaidCount, byCategory };
    }
}
exports.TransactionRepository = TransactionRepository;
exports.transactionRepository = new TransactionRepository();
//# sourceMappingURL=transaction.repository.js.map