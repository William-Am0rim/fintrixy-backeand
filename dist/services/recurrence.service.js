"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recurrenceService = exports.RecurrenceService = void 0;
const recurrence_repository_1 = require("../repositories/recurrence.repository");
const error_middleware_1 = require("../middlewares/error.middleware");
const subscription_service_1 = require("./subscription.service");
class RecurrenceService {
    async getAll(userId) {
        return recurrence_repository_1.recurrenceRepository.findAll(userId);
    }
    async getById(id, userId) {
        const recurrence = await recurrence_repository_1.recurrenceRepository.findById(id, userId);
        if (!recurrence)
            throw new error_middleware_1.AppError("Recurrence not found", 404);
        return recurrence;
    }
    async getActive(userId) {
        return recurrence_repository_1.recurrenceRepository.findActive(userId);
    }
    async getInactive(userId) {
        return recurrence_repository_1.recurrenceRepository.findInactive(userId);
    }
    async create(userId, data) {
        const limitCheck = await subscription_service_1.subscriptionService.checkLimit(userId, "recurrences");
        if (!limitCheck.allowed) {
            throw new error_middleware_1.AppError(`Limite do plano ${limitCheck.plan === "free" ? "Grátis" : "Pro"} atingido. Você só pode criar ${limitCheck.limit} recorrência(s). Assine o plano Pro para remover limites.`, 403);
        }
        return recurrence_repository_1.recurrenceRepository.create({ ...data, userId, active: true });
    }
    async update(id, userId, data) {
        const recurrence = await recurrence_repository_1.recurrenceRepository.findById(id, userId);
        if (!recurrence)
            throw new error_middleware_1.AppError("Recurrence not found", 404);
        return recurrence_repository_1.recurrenceRepository.update(id, data);
    }
    async delete(id, userId) {
        const recurrence = await recurrence_repository_1.recurrenceRepository.findById(id, userId);
        if (!recurrence)
            throw new error_middleware_1.AppError("Recurrence not found", 404);
        return recurrence_repository_1.recurrenceRepository.delete(id);
    }
    async toggleActive(id, userId) {
        const recurrence = await recurrence_repository_1.recurrenceRepository.findById(id, userId);
        if (!recurrence)
            throw new error_middleware_1.AppError("Recurrence not found", 404);
        return recurrence_repository_1.recurrenceRepository.toggleActive(id);
    }
    async processNow(id, userId) {
        const recurrence = await recurrence_repository_1.recurrenceRepository.findById(id, userId);
        if (!recurrence)
            throw new error_middleware_1.AppError("Recurrence not found", 404);
        return recurrence_repository_1.recurrenceRepository.processNow(id);
    }
    async skipNext(id, userId) {
        const recurrence = await recurrence_repository_1.recurrenceRepository.findById(id, userId);
        if (!recurrence)
            throw new error_middleware_1.AppError("Recurrence not found", 404);
        return recurrence_repository_1.recurrenceRepository.skipNext(id);
    }
    async getStats(userId) {
        return recurrence_repository_1.recurrenceRepository.getStats(userId);
    }
    async getUpcoming(userId, days = 7) {
        return recurrence_repository_1.recurrenceRepository.getUpcoming(userId, days);
    }
}
exports.RecurrenceService = RecurrenceService;
exports.recurrenceService = new RecurrenceService();
//# sourceMappingURL=recurrence.service.js.map