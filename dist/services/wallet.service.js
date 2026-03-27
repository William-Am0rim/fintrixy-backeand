"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletService = exports.WalletService = void 0;
const wallet_repository_1 = require("../repositories/wallet.repository");
const error_middleware_1 = require("../middlewares/error.middleware");
const subscription_service_1 = require("./subscription.service");
class WalletService {
    async getAll(userId) {
        return wallet_repository_1.walletRepository.findAll(userId);
    }
    async getById(id, userId) {
        const wallet = await wallet_repository_1.walletRepository.findById(id, userId);
        if (!wallet)
            throw new error_middleware_1.AppError("Wallet not found", 404);
        return wallet;
    }
    async create(userId, data) {
        const limitCheck = await subscription_service_1.subscriptionService.checkLimit(userId, "wallets");
        if (!limitCheck.allowed) {
            throw new error_middleware_1.AppError(`Limite do plano ${limitCheck.plan === "free" ? "Grátis" : "Pro"} atingido. Você só pode criar ${limitCheck.limit} carteira(s). Assine o plano Pro para remover limites.`, 403);
        }
        return wallet_repository_1.walletRepository.create({
            ...data,
            balance: data.value_initial || 0,
            userId,
        });
    }
    async update(id, userId, data) {
        const wallet = await wallet_repository_1.walletRepository.findById(id, userId);
        if (!wallet)
            throw new error_middleware_1.AppError("Wallet not found", 404);
        return wallet_repository_1.walletRepository.update(id, data);
    }
    async delete(id, userId) {
        const wallet = await wallet_repository_1.walletRepository.findById(id, userId);
        if (!wallet)
            throw new error_middleware_1.AppError("Wallet not found", 404);
        return wallet_repository_1.walletRepository.delete(id);
    }
    async updateBalance(id, userId, amount, type) {
        const wallet = await wallet_repository_1.walletRepository.findById(id, userId);
        if (!wallet)
            throw new error_middleware_1.AppError("Wallet not found", 404);
        return wallet_repository_1.walletRepository.updateBalance(id, amount, type);
    }
    async getStats(userId) {
        return wallet_repository_1.walletRepository.getStats(userId);
    }
}
exports.WalletService = WalletService;
exports.walletService = new WalletService();
//# sourceMappingURL=wallet.service.js.map