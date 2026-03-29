"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recurrenceRepository = exports.RecurrenceRepository = void 0;
const database_1 = __importDefault(require("../config/database"));
class RecurrenceRepository {
    async findAll(userId) {
        return database_1.default.recurrence.findMany({ where: { userId }, orderBy: { nextDate: "asc" } });
    }
    async findById(id, userId) {
        return database_1.default.recurrence.findFirst({ where: { id, userId } });
    }
    async findActive(userId) {
        return database_1.default.recurrence.findMany({
            where: { userId, active: true },
            orderBy: { nextDate: "asc" },
        });
    }
    async findInactive(userId) {
        return database_1.default.recurrence.findMany({
            where: { userId, active: false },
            orderBy: { updatedAt: "desc" },
        });
    }
    async create(data) {
        const { wallet_id, ...rest } = data;
        return database_1.default.recurrence.create({
            data: {
                ...rest,
                nextDate: new Date(data.nextDate),
                walletId: wallet_id || null,
            },
        });
    }
    async update(id, data) {
        const { wallet_id, ...rest } = data;
        const updateData = { ...rest };
        if (data.nextDate)
            updateData.nextDate = new Date(data.nextDate);
        if (wallet_id)
            updateData.walletId = wallet_id;
        return database_1.default.recurrence.update({ where: { id }, data: updateData });
    }
    async delete(id) {
        return database_1.default.recurrence.delete({ where: { id } });
    }
    async toggleActive(id) {
        const recurrence = await database_1.default.recurrence.findUnique({ where: { id } });
        return database_1.default.recurrence.update({
            where: { id },
            data: { active: !recurrence.active },
        });
    }
    async processNow(id) {
        const recurrence = await database_1.default.recurrence.findUnique({ where: { id } });
        const nextDate = this.calculateNextDate(recurrence.nextDate, recurrence.frequency);
        return database_1.default.recurrence.update({
            where: { id },
            data: { lastProcessed: new Date(), nextDate },
        });
    }
    async skipNext(id) {
        const recurrence = await database_1.default.recurrence.findUnique({ where: { id } });
        const nextDate = this.calculateNextDate(recurrence.nextDate, recurrence.frequency);
        return database_1.default.recurrence.update({ where: { id }, data: { nextDate } });
    }
    calculateNextDate(currentDate, frequency) {
        const date = new Date(currentDate);
        switch (frequency) {
            case "daily":
                date.setDate(date.getDate() + 1);
                break;
            case "weekly":
                date.setDate(date.getDate() + 7);
                break;
            case "monthly":
                date.setMonth(date.getMonth() + 1);
                break;
            case "yearly":
                date.setFullYear(date.getFullYear() + 1);
                break;
        }
        return date;
    }
    async getStats(userId) {
        const recurrences = await database_1.default.recurrence.findMany({ where: { userId } });
        const active = recurrences.filter((r) => r.active);
        const totalIncome = active.filter((r) => r.type === "income").reduce((sum, r) => sum + r.value, 0);
        const totalExpense = active.filter((r) => r.type === "expense").reduce((sum, r) => sum + r.value, 0);
        const byFrequency = ["daily", "weekly", "monthly", "yearly"].map((freq) => {
            const items = active.filter((r) => r.frequency === freq);
            return { frequency: freq, count: items.length, total: items.reduce((sum, r) => sum + r.value, 0) };
        });
        return {
            total: recurrences.length,
            active: active.length,
            inactive: recurrences.length - active.length,
            totalIncome,
            totalExpense,
            netBalance: totalIncome - totalExpense,
            byFrequency,
        };
    }
    async getUpcoming(userId, days = 7) {
        const now = new Date();
        const future = new Date();
        future.setDate(future.getDate() + days);
        return database_1.default.recurrence.findMany({
            where: { userId, active: true, nextDate: { gte: now, lte: future } },
            orderBy: { nextDate: "asc" },
        });
    }
}
exports.RecurrenceRepository = RecurrenceRepository;
exports.recurrenceRepository = new RecurrenceRepository();
//# sourceMappingURL=recurrence.repository.js.map