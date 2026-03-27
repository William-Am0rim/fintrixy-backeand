"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalService = exports.GoalService = void 0;
const goal_repository_1 = require("../repositories/goal.repository");
const error_middleware_1 = require("../middlewares/error.middleware");
const subscription_service_1 = require("./subscription.service");
class GoalService {
    async getAll(userId) {
        return goal_repository_1.goalRepository.findAll(userId);
    }
    async getById(id, userId) {
        const goal = await goal_repository_1.goalRepository.findById(id, userId);
        if (!goal)
            throw new error_middleware_1.AppError("Goal not found", 404);
        return goal;
    }
    async create(userId, data) {
        const limitCheck = await subscription_service_1.subscriptionService.checkLimit(userId, "goals");
        if (!limitCheck.allowed) {
            throw new error_middleware_1.AppError(`Limite do plano ${limitCheck.plan === "free" ? "Grátis" : "Pro"} atingido. Você só pode criar ${limitCheck.limit} meta(s). Assine o plano Pro para remover limites.`, 403);
        }
        return goal_repository_1.goalRepository.create({ ...data, userId, current: data.current || 0, completed: false });
    }
    async update(id, userId, data) {
        const goal = await goal_repository_1.goalRepository.findById(id, userId);
        if (!goal)
            throw new error_middleware_1.AppError("Goal not found", 404);
        return goal_repository_1.goalRepository.update(id, data);
    }
    async delete(id, userId) {
        const goal = await goal_repository_1.goalRepository.findById(id, userId);
        if (!goal)
            throw new error_middleware_1.AppError("Goal not found", 404);
        return goal_repository_1.goalRepository.delete(id);
    }
    async addContribution(id, userId, amount) {
        const goal = await goal_repository_1.goalRepository.findById(id, userId);
        if (!goal)
            throw new error_middleware_1.AppError("Goal not found", 404);
        return goal_repository_1.goalRepository.addContribution(id, amount);
    }
    async getStats(userId) {
        return goal_repository_1.goalRepository.getStats(userId);
    }
    async getOverdue(userId) {
        return goal_repository_1.goalRepository.getOverdue(userId);
    }
}
exports.GoalService = GoalService;
exports.goalService = new GoalService();
//# sourceMappingURL=goal.service.js.map