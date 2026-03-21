import prisma from "../config/database";

export interface BudgetStats {
  total: number;
  exceeded: number;
  withinLimit: number;
  totalLimit: number;
  totalSpent: number;
  totalRemaining: number;
  averagePercentage: number;
}

export class BudgetRepository {
  async findAll(userId: string) {
    return prisma.budget.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
  }

  async findById(id: string, userId: string) {
    return prisma.budget.findFirst({ where: { id, userId } });
  }

  async findByCategory(category: string, userId: string) {
    return prisma.budget.findFirst({ where: { category, userId } });
  }

  async create(data: any) {
    console.log("Budget repository - creating:", data);
    return prisma.budget.create({ data });
  }

  async update(id: string, data: any) {
    return prisma.budget.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.budget.delete({ where: { id } });
  }

  async updateSpent(id: string, amount: number) {
    const budget = await prisma.budget.findUnique({ where: { id } });
    return prisma.budget.update({
      where: { id },
      data: { spent: budget!.spent + amount },
    });
  }

  async resetSpent(id: string) {
    return prisma.budget.update({ where: { id }, data: { spent: 0 } });
  }

  async getStats(userId: string): Promise<BudgetStats> {
    const budgets = await prisma.budget.findMany({ where: { userId } });
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

  async getExceeded(userId: string) {
    const budgets = await prisma.budget.findMany({ where: { userId } });
    return budgets.filter((b) => b.spent > b.limit);
  }
}

export const budgetRepository = new BudgetRepository();
