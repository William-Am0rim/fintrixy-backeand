import { installmentRepository } from "../repositories/installment.repository";
import { AppError } from "../middlewares/error.middleware";
import { subscriptionService } from "./subscription.service";

export class InstallmentService {
  async getAll(userId: string) {
    return installmentRepository.findAll(userId);
  }

  async getById(id: string, userId: string) {
    const installment = await installmentRepository.findById(id, userId);
    if (!installment) throw new AppError("Installment not found", 404);
    return installment;
  }

  async getActive(userId: string) {
    return installmentRepository.findActive(userId);
  }

  async getCompleted(userId: string) {
    return installmentRepository.findCompleted(userId);
  }

  async create(userId: string, data: any) {
    const limitCheck = await subscriptionService.checkLimit(userId, "installments");
    if (!limitCheck.allowed) {
      throw new AppError(
        `Limite do plano ${limitCheck.plan === "free" ? "Grátis" : "Pro"} atingido. Você só pode criar ${limitCheck.limit} cartão(ões). Assine o plano Pro para remover limites.`,
        403
      );
    }
    return installmentRepository.create({ ...data, userId });
  }

  async update(id: string, userId: string, data: any) {
    const installment = await installmentRepository.findById(id, userId);
    if (!installment) throw new AppError("Installment not found", 404);
    return installmentRepository.update(id, data);
  }

  async delete(id: string, userId: string) {
    const installment = await installmentRepository.findById(id, userId);
    if (!installment) throw new AppError("Installment not found", 404);
    return installmentRepository.delete(id);
  }

  async payInstallment(id: string, userId: string, amount?: number) {
    const installment = await installmentRepository.findById(id, userId);
    if (!installment) throw new AppError("Installment not found", 404);
    if (installment.completed) throw new AppError("Installment is already completed", 400);
    return installmentRepository.payInstallment(id, amount ?? null);
  }

  async getStats(userId: string) {
    return installmentRepository.getStats(userId);
  }

  async getUpcoming(userId: string, days = 7) {
    return installmentRepository.getUpcoming(userId, days);
  }

  async getOverdue(userId: string) {
    return installmentRepository.getOverdue(userId);
  }
}

export const installmentService = new InstallmentService();
