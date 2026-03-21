import prisma from "../config/database";

export interface GoalStats {
  total: number;
  completed: number;
  inProgress: number;
  totalTarget: number;
  totalCurrent: number;
  averageProgress: number;
}

export class GoalRepository {
  async findAll(userId: string) {
    return prisma.goal.findMany({ where: { userId }, orderBy: { deadline: "asc" } });
  }

  async findById(id: string, userId: string) {
    return prisma.goal.findFirst({ where: { id, userId } });
  }

  async create(data: any) {
    return prisma.goal.create({
      data: { ...data, deadline: new Date(data.deadline) },
    });
  }

  async update(id: string, data: any) {
    const updateData = { ...data };
    if (data.deadline) updateData.deadline = new Date(data.deadline);
    return prisma.goal.update({ where: { id }, data: updateData });
  }

  async delete(id: string) {
    return prisma.goal.delete({ where: { id } });
  }

  async addContribution(id: string, amount: number) {
    const goal = await prisma.goal.findUnique({ where: { id } });
    const newCurrent = goal!.current + amount;
    return prisma.goal.update({
      where: { id },
      data: { current: newCurrent, completed: newCurrent >= goal!.target },
    });
  }

  async getStats(userId: string): Promise<GoalStats> {
    const goals = await prisma.goal.findMany({ where: { userId } });
    const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
    const totalCurrent = goals.reduce((sum, g) => sum + g.current, 0);
    const completed = goals.filter((g) => g.completed).length;
    return {
      total: goals.length,
      completed,
      inProgress: goals.length - completed,
      totalTarget,
      totalCurrent,
      averageProgress: goals.length > 0 ? (totalCurrent / totalTarget) * 100 : 0,
    };
  }

  async getOverdue(userId: string) {
    return prisma.goal.findMany({
      where: { userId, deadline: { lt: new Date() }, completed: false },
      orderBy: { deadline: "asc" },
    });
  }
}

export const goalRepository = new GoalRepository();
