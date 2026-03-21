import { goalRepository } from "../repositories/goal.repository";
import { AppError } from "../middlewares/error.middleware";
import { subscriptionService } from "./subscription.service";

export class GoalService {
  async getAll(userId: string) {
    return goalRepository.findAll(userId);
  }

  async getById(id: string, userId: string) {
    const goal = await goalRepository.findById(id, userId);
    if (!goal) throw new AppError("Goal not found", 404);
    return goal;
  }

  async create(userId: string, data: any) {
    const limitCheck = await subscriptionService.checkLimit(userId, "goals");
    if (!limitCheck.allowed) {
      throw new AppError(
        `Limite do plano ${limitCheck.plan === "free" ? "Grátis" : "Pro"} atingido. Você só pode criar ${limitCheck.limit} meta(s). Assine o plano Pro para remover limites.`,
        403
      );
    }
    return goalRepository.create({ ...data, userId, current: data.current || 0, completed: false });
  }

  async update(id: string, userId: string, data: any) {
    const goal = await goalRepository.findById(id, userId);
    if (!goal) throw new AppError("Goal not found", 404);
    return goalRepository.update(id, data);
  }

  async delete(id: string, userId: string) {
    const goal = await goalRepository.findById(id, userId);
    if (!goal) throw new AppError("Goal not found", 404);
    return goalRepository.delete(id);
  }

  async addContribution(id: string, userId: string, amount: number) {
    const goal = await goalRepository.findById(id, userId);
    if (!goal) throw new AppError("Goal not found", 404);
    return goalRepository.addContribution(id, amount);
  }

  async getStats(userId: string) {
    return goalRepository.getStats(userId);
  }

  async getOverdue(userId: string) {
    return goalRepository.getOverdue(userId);
  }
}

export const goalService = new GoalService();
