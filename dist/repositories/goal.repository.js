"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalRepository = exports.GoalRepository = void 0;
const database_1 = __importDefault(require("../config/database"));
class GoalRepository {
    async findAll(userId) {
        return database_1.default.goal.findMany({ where: { userId }, orderBy: { deadline: "asc" } });
    }
    async findById(id, userId) {
        return database_1.default.goal.findFirst({ where: { id, userId } });
    }
    async create(data) {
        return database_1.default.goal.create({
            data: { ...data, deadline: new Date(data.deadline) },
        });
    }
    async update(id, data) {
        const updateData = { ...data };
        if (data.deadline)
            updateData.deadline = new Date(data.deadline);
        return database_1.default.goal.update({ where: { id }, data: updateData });
    }
    async delete(id) {
        return database_1.default.goal.delete({ where: { id } });
    }
    async addContribution(id, amount) {
        const goal = await database_1.default.goal.findUnique({ where: { id } });
        const newCurrent = goal.current + amount;
        return database_1.default.goal.update({
            where: { id },
            data: { current: newCurrent, completed: newCurrent >= goal.target },
        });
    }
    async getStats(userId) {
        const goals = await database_1.default.goal.findMany({ where: { userId } });
        const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
        const totalCurrent = goals.reduce((sum, g) => sum + g.current, 0);
        const completed = goals.filter((g) => g.completed).length;
        return {
            total: goals.length,
            completed,
            inProgress: goals.length - completed,
            totalTarget,
            totalCurrent,
            averageProgress: goals.length > 0 ? (totalCurrent / totalTarget) * 100 : 0,
        };
    }
    async getOverdue(userId) {
        return database_1.default.goal.findMany({
            where: { userId, deadline: { lt: new Date() }, completed: false },
            orderBy: { deadline: "asc" },
        });
    }
}
exports.GoalRepository = GoalRepository;
exports.goalRepository = new GoalRepository();
//# sourceMappingURL=goal.repository.js.map