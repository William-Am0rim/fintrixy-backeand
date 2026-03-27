"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installmentService = exports.InstallmentService = void 0;
const installment_repository_1 = require("../repositories/installment.repository");
const error_middleware_1 = require("../middlewares/error.middleware");
const subscription_service_1 = require("./subscription.service");
class InstallmentService {
    async getAll(userId) {
        return installment_repository_1.installmentRepository.findAll(userId);
    }
    async getById(id, userId) {
        const installment = await installment_repository_1.installmentRepository.findById(id, userId);
        if (!installment)
            throw new error_middleware_1.AppError("Installment not found", 404);
        return installment;
    }
    async getActive(userId) {
        return installment_repository_1.installmentRepository.findActive(userId);
    }
    async getCompleted(userId) {
        return installment_repository_1.installmentRepository.findCompleted(userId);
    }
    async create(userId, data) {
        const limitCheck = await subscription_service_1.subscriptionService.checkLimit(userId, "installments");
        if (!limitCheck.allowed) {
            throw new error_middleware_1.AppError(`Limite do plano ${limitCheck.plan === "free" ? "Grátis" : "Pro"} atingido. Você só pode criar ${limitCheck.limit} cartão(ões). Assine o plano Pro para remover limites.`, 403);
        }
        return installment_repository_1.installmentRepository.create({ ...data, userId });
    }
    async update(id, userId, data) {
        const installment = await installment_repository_1.installmentRepository.findById(id, userId);
        if (!installment)
            throw new error_middleware_1.AppError("Installment not found", 404);
        return installment_repository_1.installmentRepository.update(id, data);
    }
    async delete(id, userId) {
        const installment = await installment_repository_1.installmentRepository.findById(id, userId);
        if (!installment)
            throw new error_middleware_1.AppError("Installment not found", 404);
        return installment_repository_1.installmentRepository.delete(id);
    }
    async payInstallment(id, userId, amount) {
        const installment = await installment_repository_1.installmentRepository.findById(id, userId);
        if (!installment)
            throw new error_middleware_1.AppError("Installment not found", 404);
        if (installment.completed)
            throw new error_middleware_1.AppError("Installment is already completed", 400);
        return installment_repository_1.installmentRepository.payInstallment(id, amount ?? null);
    }
    async getStats(userId) {
        return installment_repository_1.installmentRepository.getStats(userId);
    }
    async getUpcoming(userId, days = 7) {
        return installment_repository_1.installmentRepository.getUpcoming(userId, days);
    }
    async getOverdue(userId) {
        return installment_repository_1.installmentRepository.getOverdue(userId);
    }
}
exports.InstallmentService = InstallmentService;
exports.installmentService = new InstallmentService();
//# sourceMappingURL=installment.service.js.map