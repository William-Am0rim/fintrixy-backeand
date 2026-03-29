import prisma from "../config/database";

export interface RecurrenceStats {
  total: number;
  active: number;
  inactive: number;
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  byFrequency: { frequency: string; count: number; total: number }[];
}

export class RecurrenceRepository {
  async findAll(userId: string) {
    return prisma.recurrence.findMany({ where: { userId }, orderBy: { nextDate: "asc" } });
  }

  async findById(id: string, userId: string) {
    return prisma.recurrence.findFirst({ where: { id, userId } });
  }

  async findActive(userId: string) {
    return prisma.recurrence.findMany({
      where: { userId, active: true },
      orderBy: { nextDate: "asc" },
    });
  }

  async findInactive(userId: string) {
    return prisma.recurrence.findMany({
      where: { userId, active: false },
      orderBy: { updatedAt: "desc" },
    });
  }

  async create(data: any) {
    const { wallet_id, ...rest } = data;
    return prisma.recurrence.create({
      data: { 
        ...rest, 
        nextDate: new Date(data.nextDate),
        walletId: wallet_id || null,
      },
    });
  }

  async update(id: string, data: any) {
    const { wallet_id, ...rest } = data;
    const updateData: any = { ...rest };
    if (data.nextDate) updateData.nextDate = new Date(data.nextDate);
    if (wallet_id) updateData.walletId = wallet_id;
    return prisma.recurrence.update({ where: { id }, data: updateData });
  }

  async delete(id: string) {
    return prisma.recurrence.delete({ where: { id } });
  }

  async toggleActive(id: string) {
    const recurrence = await prisma.recurrence.findUnique({ where: { id } });
    return prisma.recurrence.update({
      where: { id },
      data: { active: !recurrence!.active },
    });
  }

  async processNow(id: string) {
    const recurrence = await prisma.recurrence.findUnique({ where: { id } });
    const nextDate = this.calculateNextDate(recurrence!.nextDate, recurrence!.frequency);
    return prisma.recurrence.update({
      where: { id },
      data: { lastProcessed: new Date(), nextDate },
    });
  }

  async skipNext(id: string) {
    const recurrence = await prisma.recurrence.findUnique({ where: { id } });
    const nextDate = this.calculateNextDate(recurrence!.nextDate, recurrence!.frequency);
    return prisma.recurrence.update({ where: { id }, data: { nextDate } });
  }

  calculateNextDate(currentDate: Date, frequency: string): Date {
    const date = new Date(currentDate);
    switch (frequency) {
      case "daily": date.setDate(date.getDate() + 1); break;
      case "weekly": date.setDate(date.getDate() + 7); break;
      case "monthly": date.setMonth(date.getMonth() + 1); break;
      case "yearly": date.setFullYear(date.getFullYear() + 1); break;
    }
    return date;
  }

  async getStats(userId: string): Promise<RecurrenceStats> {
    const recurrences = await prisma.recurrence.findMany({ where: { userId } });
    const active = recurrences.filter((r) => r.active);
    const totalIncome = active.filter((r) => r.type === "income").reduce((sum, r) => sum + r.value, 0);
    const totalExpense = active.filter((r) => r.type === "expense").reduce((sum, r) => sum + r.value, 0);
    const byFrequency = ["daily", "weekly", "monthly", "yearly"].map((freq) => {
      const items = active.filter((r) => r.frequency === freq);
      return { frequency: freq, count: items.length, total: items.reduce((sum, r) => sum + r.value, 0) };
    });
    return {
      total: recurrences.length,
      active: active.length,
      inactive: recurrences.length - active.length,
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      byFrequency,
    };
  }

  async getUpcoming(userId: string, days = 7) {
    const now = new Date();
    const future = new Date();
    future.setDate(future.getDate() + days);
    return prisma.recurrence.findMany({
      where: { userId, active: true, nextDate: { gte: now, lte: future } },
      orderBy: { nextDate: "asc" },
    });
  }
}

export const recurrenceRepository = new RecurrenceRepository();
