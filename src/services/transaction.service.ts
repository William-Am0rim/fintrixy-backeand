import { transactionRepository } from "../repositories/transaction.repository";
import { walletRepository } from "../repositories/wallet.repository";
import { AppError } from "../middlewares/error.middleware";
import { subscriptionService } from "./subscription.service";

export class TransactionService {
  async getAll(userId: string, filters: any = {}) {
    return transactionRepository.findAll(userId, filters);
  }

  async getById(id: string, userId: string) {
    const transaction = await transactionRepository.findById(id, userId);
    if (!transaction) throw new AppError("Transaction not found", 404);
    return transaction;
  }

  async getRecent(userId: string, limit = 10) {
    return transactionRepository.findRecent(userId, limit);
  }

  async create(userId: string, data: any) {
    const limitCheck = await subscriptionService.checkLimit(userId, "transactions");
    if (!limitCheck.allowed) {
      throw new AppError(
        `Limite do plano ${limitCheck.plan === "free" ? "Grátis" : "Pro"} atingido. Você só pode criar ${limitCheck.limit} transação(ões). Assine o plano Pro para remover limites.`,
        403
      );
    }
    const walletId = data.wallet_id || data.walletId;
    const walletToId = data.wallet_to_id;
    const transaction = await transactionRepository.create({ ...data, userId });
    await this.updateWalletBalance(walletId, data.value, data.type);
    if (data.type === "transfer" && walletToId) {
      await this.updateWalletBalance(walletToId, data.value, "income");
    }
    return transaction;
  }

  async update(id: string, userId: string, data: any) {
    const existing = await transactionRepository.findById(id, userId);
    if (!existing) throw new AppError("Transaction not found", 404);
    return transactionRepository.update(id, data);
  }

  async delete(id: string, userId: string) {
    const transaction = await transactionRepository.findById(id, userId);
    if (!transaction) throw new AppError("Transaction not found", 404);
    return transactionRepository.delete(id);
  }

  async updateWalletBalance(walletId: string, amount: number, type: string, isReverse = false) {
    const operation = type === "income" ? (isReverse ? "subtract" : "add") : (isReverse ? "add" : "subtract");
    await walletRepository.updateBalance(walletId, amount, operation);
  }

  async getStats(userId: string, filters: any = {}) {
    return transactionRepository.getStats(userId, filters);
  }
}

export const transactionService = new TransactionService();
