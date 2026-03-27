"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetService = exports.BudgetService = void 0;
const budget_repository_1 = require("../repositories/budget.repository");
const error_middleware_1 = require("../middlewares/error.middleware");
const subscription_service_1 = require("./subscription.service");
class BudgetService {
    async getAll(userId) {
        return budget_repository_1.budgetRepository.findAll(userId);
    }
    async getById(id, userId) {
        const budget = await budget_repository_1.budgetRepository.findById(id, userId);
        if (!budget)
            throw new error_middleware_1.AppError("Budget not found", 404);
        return budget;
    }
    async create(userId, data) {
        const limitCheck = await subscription_service_1.subscriptionService.checkLimit(userId, "budgets");
        if (!limitCheck.allowed) {
            throw new error_middleware_1.AppError(`Limite do plano ${limitCheck.plan === "free" ? "Grátis" : "Pro"} atingido. Você só pode criar ${limitCheck.limit} orçamento(s). Assine o plano Pro para remover limites.`, 403);
        }
        const existing = await budget_repository_1.budgetRepository.findByCategory(data.category, userId);
        if (existing)
            throw new error_middleware_1.AppError("Budget for this category already exists", 400);
        return budget_repository_1.budgetRepository.create({ ...data, userId, spent: data.spent || 0 });
    }
    async update(id, userId, data) {
        const budget = await budget_repository_1.budgetRepository.findById(id, userId);
        if (!budget)
            throw new error_middleware_1.AppError("Budget not found", 404);
        return budget_repository_1.budgetRepository.update(id, data);
    }
    async delete(id, userId) {
        const budget = await budget_repository_1.budgetRepository.findById(id, userId);
        if (!budget)
            throw new error_middleware_1.AppError("Budget not found", 404);
        return budget_repository_1.budgetRepository.delete(id);
    }
    async updateSpent(id, userId, amount) {
        const budget = await budget_repository_1.budgetRepository.findById(id, userId);
        if (!budget)
            throw new error_middleware_1.AppError("Budget not found", 404);
        return budget_repository_1.budgetRepository.updateSpent(id, amount);
    }
    async resetSpent(id, userId) {
        const budget = await budget_repository_1.budgetRepository.findById(id, userId);
        if (!budget)
            throw new error_middleware_1.AppError("Budget not found", 404);
        return budget_repository_1.budgetRepository.resetSpent(id);
    }
    async getStats(userId) {
        return budget_repository_1.budgetRepository.getStats(userId);
    }
    async getExceeded(userId) {
        return budget_repository_1.budgetRepository.getExceeded(userId);
    }
}
exports.BudgetService = BudgetService;
exports.budgetService = new BudgetService();
//# sourceMappingURL=budget.service.js.map