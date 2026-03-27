"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetRepository = exports.BudgetRepository = void 0;
const database_1 = __importDefault(require("../config/database"));
class BudgetRepository {
    async findAll(userId) {
        return database_1.default.budget.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
    }
    async findById(id, userId) {
        return database_1.default.budget.findFirst({ where: { id, userId } });
    }
    async findByCategory(category, userId) {
        return database_1.default.budget.findFirst({ where: { category, userId } });
    }
    async create(data) {
        console.log("Budget repository - creating:", data);
        return database_1.default.budget.create({ data });
    }
    async update(id, data) {
        return database_1.default.budget.update({ where: { id }, data });
    }
    async delete(id) {
        return database_1.default.budget.delete({ where: { id } });
    }
    async updateSpent(id, amount) {
        const budget = await database_1.default.budget.findUnique({ where: { id } });
        return database_1.default.budget.update({
            where: { id },
            data: { spent: budget.spent + amount },
        });
    }
    async resetSpent(id) {
        return database_1.default.budget.update({ where: { id }, data: { spent: 0 } });
    }
    async getStats(userId) {
        const budgets = await database_1.default.budget.findMany({ where: { userId } });
        const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
        const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
        const exceeded = budgets.filter((b) => b.spent > b.limit).length;
        return {
            total: budgets.length,
            exceeded,
            withinLimit: budgets.length - exceeded,
            totalLimit,
            totalSpent,
            totalRemaining: totalLimit - totalSpent,
            averagePercentage: budgets.length > 0 ? (totalSpent / totalLimit) * 100 : 0,
        };
    }
    async getExceeded(userId) {
        const budgets = await database_1.default.budget.findMany({ where: { userId } });
        return budgets.filter((b) => b.spent > b.limit);
    }
}
exports.BudgetRepository = BudgetRepository;
exports.budgetRepository = new BudgetRepository();
//# sourceMappingURL=budget.repository.js.map