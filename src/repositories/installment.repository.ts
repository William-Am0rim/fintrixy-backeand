import prisma from "../config/database";

export interface InstallmentStats {
  total: number;
  active: number;
  completed: number;
  totalRemaining: number;
  totalPaid: number;
  averageInstallment: number;
}

export class InstallmentRepository {
  async findAll(userId: string) {
    return prisma.installment.findMany({ where: { userId }, orderBy: { nextDueDate: "asc" } });
  }

  async findById(id: string, userId: string) {
    return prisma.installment.findFirst({ where: { id, userId } });
  }

  async findActive(userId: string) {
    return prisma.installment.findMany({
      where: { userId, completed: false },
      orderBy: { nextDueDate: "asc" },
    });
  }

  async findCompleted(userId: string) {
    return prisma.installment.findMany({
      where: { userId, completed: true },
      orderBy: { updatedAt: "desc" },
    });
  }

  async create(data: any) {
    const { startDate, ...rest } = data;
    console.log("Installment repository - creating with:", { startDate, ...rest });
    return prisma.installment.create({
      data: {
        ...rest,
        nextDueDate: startDate ? new Date(startDate) : new Date(),
        paidValue: 0,
        paidInstallments: 0,
      },
    });
  }

  async update(id: string, data: any) {
    const updateData: any = { ...data };
    if (data.startDate) {
      updateData.nextDueDate = new Date(data.startDate);
      delete updateData.startDate;
    }
    return prisma.installment.update({ where: { id }, data: updateData });
  }

  async delete(id: string) {
    return prisma.installment.delete({ where: { id } });
  }

  async payInstallment(id: string, amount: number | null) {
    const installment = await prisma.installment.findUnique({ where: { id } });
    if (!installment) {
      throw new Error("Installment not found");
    }
    const installmentValue = installment.totalValue / installment.totalInstallments;
    const paymentAmount = amount || installmentValue;
    const newPaidValue = installment.paidValue + paymentAmount;
    const newPaidInstallments = installment.paidInstallments + 1;
    const completed = newPaidInstallments >= installment.totalInstallments;
    
    let nextDate: Date | null = null;
    if (!completed) {
      nextDate = new Date(installment.nextDueDate);
      nextDate.setMonth(nextDate.getMonth() + 1);
    }

    return prisma.installment.update({
      where: { id },
      data: {
        paidValue: Math.min(newPaidValue, installment.totalValue),
        paidInstallments: newPaidInstallments,
        nextDueDate: nextDate ?? undefined,
        completed,
      },
    });
  }

  async getStats(userId: string): Promise<InstallmentStats> {
    const installments = await prisma.installment.findMany({ where: { userId } });
    const active = installments.filter((i) => !i.completed);
    const completed = installments.filter((i) => i.completed);
    const totalRemaining = active.reduce((sum, i) => sum + (i.totalValue - i.paidValue), 0);
    const totalPaid = installments.reduce((sum, i) => sum + i.paidValue, 0);
    return {
      total: installments.length,
      active: active.length,
      completed: completed.length,
      totalRemaining,
      totalPaid,
      averageInstallment: active.length > 0 ? totalRemaining / active.reduce((sum, i) => sum + (i.totalInstallments - i.paidInstallments), 0) : 0,
    };
  }

  async getUpcoming(userId: string, days = 7) {
    const now = new Date();
    const future = new Date();
    future.setDate(future.getDate() + days);
    return prisma.installment.findMany({
      where: { userId, completed: false, nextDueDate: { gte: now, lte: future } },
      orderBy: { nextDueDate: "asc" },
    });
  }

  async getOverdue(userId: string) {
    return prisma.installment.findMany({
      where: { userId, completed: false, nextDueDate: { lt: new Date() } },
      orderBy: { nextDueDate: "asc" },
    });
  }
}

export const installmentRepository = new InstallmentRepository();
