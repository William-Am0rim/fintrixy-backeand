import prisma from "../config/database";

export interface TransactionFilters {
  search?: string;
  type?: string;
  category?: string;
  wallet_id?: string;
  paid?: boolean;
  date_from?: string;
  date_to?: string;
}

export interface TransactionStats {
  total: number;
  income: number;
  expense: number;
  transfer: number;
  paidCount: number;
  unpaidCount: number;
  byCategory: { category: string; total: number }[];
}

export class TransactionRepository {
  async findAll(userId: string, filters: TransactionFilters = {}) {
    const where: any = { userId };

    if (filters.search) {
      where.description = { contains: filters.search, mode: "insensitive" };
    }
    if (filters.type && filters.type !== "all") where.type = filters.type;
    if (filters.category) where.category = { contains: filters.category, mode: "insensitive" };
    if (filters.wallet_id) where.walletId = filters.wallet_id;
    if (filters.paid !== undefined) where.paid = filters.paid;
    if (filters.date_from && filters.date_to) {
      where.date = { gte: new Date(filters.date_from), lte: new Date(filters.date_to) };
    }

    return prisma.transaction.findMany({
      where,
      include: {
        wallet: { select: { id: true, name: true, color: true } },
        walletTo: { select: { id: true, name: true, color: true } },
      },
      orderBy: { date: "desc" },
    });
  }

  async findById(id: string, userId: string) {
    return prisma.transaction.findFirst({
      where: { id, userId },
      include: {
        wallet: { select: { id: true, name: true, color: true } },
        walletTo: { select: { id: true, name: true, color: true } },
      },
    });
  }

  async findRecent(userId: string, limit = 10) {
    return prisma.transaction.findMany({
      where: { userId },
      include: { wallet: { select: { id: true, name: true, color: true } } },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  async create(data: any) {
    const { wallet_id, ...rest } = data;
    return prisma.transaction.create({
      data: { 
        ...rest, 
        date: new Date(data.date),
        walletId: wallet_id || data.walletId,
      },
      include: { wallet: { select: { id: true, name: true, color: true } } },
    });
  }

  async update(id: string, data: any) {
    const { wallet_id, ...rest } = data;
    const updateData: any = { ...rest };
    if (data.date) updateData.date = new Date(data.date);
    if (wallet_id) updateData.walletId = wallet_id;
    return prisma.transaction.update({
      where: { id },
      data: updateData,
      include: { wallet: { select: { id: true, name: true, color: true } } },
    });
  }

  async delete(id: string) {
    return prisma.transaction.delete({ where: { id } });
  }

  async getStats(userId: string, filters: TransactionFilters = {}): Promise<TransactionStats> {
    const where: any = { userId };
    if (filters.date_from && filters.date_to) {
      where.date = { gte: new Date(filters.date_from), lte: new Date(filters.date_to) };
    }

    const [typeGroup, paidGroup, categoryGroup] = await Promise.all([
      prisma.transaction.groupBy({
        by: ['type'],
        where,
        _sum: { value: true },
      }),
      prisma.transaction.groupBy({
        by: ['paid'],
        where,
        _count: { _all: true },
      }),
      prisma.transaction.groupBy({
        by: ['category'],
        where,
        _sum: { value: true },
      })
    ]);

    let income = 0;
    let expense = 0;
    let transfer = 0;

    typeGroup.forEach((g) => {
      if (g.type === "income") income = g._sum.value || 0;
      if (g.type === "expense") expense = g._sum.value || 0;
      if (g.type === "transfer") transfer = g._sum.value || 0;
    });

    const total = income + expense + transfer;

    let paidCount = 0;
    let unpaidCount = 0;

    paidGroup.forEach((g) => {
      if (g.paid) paidCount = g._count._all;
      else unpaidCount = g._count._all;
    });

    const byCategory = categoryGroup.map((g) => ({
      category: g.category,
      total: g._sum.value || 0,
    })).sort((a, b) => b.total - a.total);

    return { total, income, expense, transfer, paidCount, unpaidCount, byCategory };
  }
}

export const transactionRepository = new TransactionRepository();
