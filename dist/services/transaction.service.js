"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionService = exports.TransactionService = void 0;
const transaction_repository_1 = require("../repositories/transaction.repository");
const wallet_repository_1 = require("../repositories/wallet.repository");
const error_middleware_1 = require("../middlewares/error.middleware");
const subscription_service_1 = require("./subscription.service");
class TransactionService {
    async getAll(userId, filters = {}) {
        return transaction_repository_1.transactionRepository.findAll(userId, filters);
    }
    async getById(id, userId) {
        const transaction = await transaction_repository_1.transactionRepository.findById(id, userId);
        if (!transaction)
            throw new error_middleware_1.AppError("Transaction not found", 404);
        return transaction;
    }
    async getRecent(userId, limit = 10) {
        return transaction_repository_1.transactionRepository.findRecent(userId, limit);
    }
    async create(userId, data) {
        const limitCheck = await subscription_service_1.subscriptionService.checkLimit(userId, "transactions");
        if (!limitCheck.allowed) {
            throw new error_middleware_1.AppError(`Limite do plano ${limitCheck.plan === "free" ? "Grátis" : "Pro"} atingido. Você só pode criar ${limitCheck.limit} transação(ões). Assine o plano Pro para remover limites.`, 403);
        }
        const walletId = data.wallet_id || data.walletId;
        const walletToId = data.wallet_to_id;
        const transaction = await transaction_repository_1.transactionRepository.create({ ...data, userId });
        await this.updateWalletBalance(walletId, data.value, data.type);
        if (data.type === "transfer" && walletToId) {
            await this.updateWalletBalance(walletToId, data.value, "income");
        }
        return transaction;
    }
    async update(id, userId, data) {
        const existing = await transaction_repository_1.transactionRepository.findById(id, userId);
        if (!existing)
            throw new error_middleware_1.AppError("Transaction not found", 404);
        return transaction_repository_1.transactionRepository.update(id, data);
    }
    async delete(id, userId) {
        const transaction = await transaction_repository_1.transactionRepository.findById(id, userId);
        if (!transaction)
            throw new error_middleware_1.AppError("Transaction not found", 404);
        return transaction_repository_1.transactionRepository.delete(id);
    }
    async updateWalletBalance(walletId, amount, type, isReverse = false) {
        const operation = type === "income" ? (isReverse ? "subtract" : "add") : (isReverse ? "add" : "subtract");
        await wallet_repository_1.walletRepository.updateBalance(walletId, amount, operation);
    }
    async getStats(userId, filters = {}) {
        return transaction_repository_1.transactionRepository.getStats(userId, filters);
    }
}
exports.TransactionService = TransactionService;
exports.transactionService = new TransactionService();
//# sourceMappingURL=transaction.service.js.map