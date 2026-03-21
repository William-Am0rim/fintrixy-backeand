import { budgetRepository } from "../repositories/budget.repository";
import { AppError } from "../middlewares/error.middleware";
import { subscriptionService } from "./subscription.service";

export class BudgetService {
  async getAll(userId: string) {
    return budgetRepository.findAll(userId);
  }

  async getById(id: string, userId: string) {
    const budget = await budgetRepository.findById(id, userId);
    if (!budget) throw new AppError("Budget not found", 404);
    return budget;
  }

  async create(userId: string, data: any) {
    const limitCheck = await subscriptionService.checkLimit(userId, "budgets");
    if (!limitCheck.allowed) {
      throw new AppError(
        `Limite do plano ${limitCheck.plan === "free" ? "Grátis" : "Pro"} atingido. Você só pode criar ${limitCheck.limit} orçamento(s). Assine o plano Pro para remover limites.`,
        403
      );
    }
    const existing = await budgetRepository.findByCategory(data.category, userId);
    if (existing) throw new AppError("Budget for this category already exists", 400);
    return budgetRepository.create({ ...data, userId, spent: data.spent || 0 });
  }

  async update(id: string, userId: string, data: any) {
    const budget = await budgetRepository.findById(id, userId);
    if (!budget) throw new AppError("Budget not found", 404);
    return budgetRepository.update(id, data);
  }

  async delete(id: string, userId: string) {
    const budget = await budgetRepository.findById(id, userId);
    if (!budget) throw new AppError("Budget not found", 404);
    return budgetRepository.delete(id);
  }

  async updateSpent(id: string, userId: string, amount: number) {
    const budget = await budgetRepository.findById(id, userId);
    if (!budget) throw new AppError("Budget not found", 404);
    return budgetRepository.updateSpent(id, amount);
  }

  async resetSpent(id: string, userId: string) {
    const budget = await budgetRepository.findById(id, userId);
    if (!budget) throw new AppError("Budget not found", 404);
    return budgetRepository.resetSpent(id);
  }

  async getStats(userId: string) {
    return budgetRepository.getStats(userId);
  }

  async getExceeded(userId: string) {
    return budgetRepository.getExceeded(userId);
  }
}

export const budgetService = new BudgetService();
