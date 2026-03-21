import { recurrenceRepository } from "../repositories/recurrence.repository";
import { AppError } from "../middlewares/error.middleware";
import { subscriptionService } from "./subscription.service";

export class RecurrenceService {
  async getAll(userId: string) {
    return recurrenceRepository.findAll(userId);
  }

  async getById(id: string, userId: string) {
    const recurrence = await recurrenceRepository.findById(id, userId);
    if (!recurrence) throw new AppError("Recurrence not found", 404);
    return recurrence;
  }

  async getActive(userId: string) {
    return recurrenceRepository.findActive(userId);
  }

  async getInactive(userId: string) {
    return recurrenceRepository.findInactive(userId);
  }

  async create(userId: string, data: any) {
    const limitCheck = await subscriptionService.checkLimit(userId, "recurrences");
    if (!limitCheck.allowed) {
      throw new AppError(
        `Limite do plano ${limitCheck.plan === "free" ? "Grátis" : "Pro"} atingido. Você só pode criar ${limitCheck.limit} recorrência(s). Assine o plano Pro para remover limites.`,
        403
      );
    }
    return recurrenceRepository.create({ ...data, userId, active: true });
  }

  async update(id: string, userId: string, data: any) {
    const recurrence = await recurrenceRepository.findById(id, userId);
    if (!recurrence) throw new AppError("Recurrence not found", 404);
    return recurrenceRepository.update(id, data);
  }

  async delete(id: string, userId: string) {
    const recurrence = await recurrenceRepository.findById(id, userId);
    if (!recurrence) throw new AppError("Recurrence not found", 404);
    return recurrenceRepository.delete(id);
  }

  async toggleActive(id: string, userId: string) {
    const recurrence = await recurrenceRepository.findById(id, userId);
    if (!recurrence) throw new AppError("Recurrence not found", 404);
    return recurrenceRepository.toggleActive(id);
  }

  async processNow(id: string, userId: string) {
    const recurrence = await recurrenceRepository.findById(id, userId);
    if (!recurrence) throw new AppError("Recurrence not found", 404);
    return recurrenceRepository.processNow(id);
  }

  async skipNext(id: string, userId: string) {
    const recurrence = await recurrenceRepository.findById(id, userId);
    if (!recurrence) throw new AppError("Recurrence not found", 404);
    return recurrenceRepository.skipNext(id);
  }

  async getStats(userId: string) {
    return recurrenceRepository.getStats(userId);
  }

  async getUpcoming(userId: string, days = 7) {
    return recurrenceRepository.getUpcoming(userId, days);
  }
}

export const recurrenceService = new RecurrenceService();
