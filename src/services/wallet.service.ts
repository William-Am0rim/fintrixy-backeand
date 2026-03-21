import { walletRepository } from "../repositories/wallet.repository";
import { AppError } from "../middlewares/error.middleware";
import { subscriptionService } from "./subscription.service";

export class WalletService {
  async getAll(userId: string) {
    return walletRepository.findAll(userId);
  }

  async getById(id: string, userId: string) {
    const wallet = await walletRepository.findById(id, userId);
    if (!wallet) throw new AppError("Wallet not found", 404);
    return wallet;
  }

  async create(userId: string, data: any) {
    const limitCheck = await subscriptionService.checkLimit(userId, "wallets");
    if (!limitCheck.allowed) {
      throw new AppError(
        `Limite do plano ${limitCheck.plan === "free" ? "Grátis" : "Pro"} atingido. Você só pode criar ${limitCheck.limit} carteira(s). Assine o plano Pro para remover limites.`,
        403
      );
    }
    return walletRepository.create({
      ...data,
      balance: data.value_initial || 0,
      userId,
    });
  }

  async update(id: string, userId: string, data: any) {
    const wallet = await walletRepository.findById(id, userId);
    if (!wallet) throw new AppError("Wallet not found", 404);
    return walletRepository.update(id, data);
  }

  async delete(id: string, userId: string) {
    const wallet = await walletRepository.findById(id, userId);
    if (!wallet) throw new AppError("Wallet not found", 404);
    return walletRepository.delete(id);
  }

  async updateBalance(id: string, userId: string, amount: number, type: "add" | "subtract") {
    const wallet = await walletRepository.findById(id, userId);
    if (!wallet) throw new AppError("Wallet not found", 404);
    return walletRepository.updateBalance(id, amount, type);
  }

  async getStats(userId: string) {
    return walletRepository.getStats(userId);
  }
}

export const walletService = new WalletService();
