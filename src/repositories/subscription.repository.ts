import prisma from "../config/database";

export class SubscriptionRepository {
  async findByUserId(userId: string) {
    return prisma.subscription.findUnique({
      where: { userId },
    });
  }

  async create(userId: string, data: any) {
    return prisma.subscription.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async update(userId: string, data: any) {
    return prisma.subscription.update({
      where: { userId },
      data,
    });
  }

  async upsert(userId: string, data: any) {
    return prisma.subscription.upsert({
      where: { userId },
      create: { ...data, userId },
      update: data,
    });
  }

  async delete(userId: string) {
    return prisma.subscription.delete({
      where: { userId },
    });
  }

  async countWallets(userId: string) {
    return prisma.wallet.count({ where: { userId } });
  }

  async countTransactions(userId: string) {
    return prisma.transaction.count({ where: { userId } });
  }

  async countRecurrences(userId: string) {
    return prisma.recurrence.count({ where: { userId } });
  }

  async countGoals(userId: string) {
    return prisma.goal.count({ where: { userId } });
  }

  async countInstallments(userId: string) {
    return prisma.installment.count({ where: { userId } });
  }

  async countBudgets(userId: string) {
    return prisma.budget.count({ where: { userId } });
  }
}

export const subscriptionRepository = new SubscriptionRepository();
