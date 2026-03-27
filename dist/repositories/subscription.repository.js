"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionRepository = exports.SubscriptionRepository = void 0;
const database_1 = __importDefault(require("../config/database"));
class SubscriptionRepository {
    async findByUserId(userId) {
        return database_1.default.subscription.findUnique({
            where: { userId },
        });
    }
    async create(userId, data) {
        return database_1.default.subscription.create({
            data: {
                ...data,
                userId,
            },
        });
    }
    async update(userId, data) {
        return database_1.default.subscription.update({
            where: { userId },
            data,
        });
    }
    async upsert(userId, data) {
        return database_1.default.subscription.upsert({
            where: { userId },
            create: { ...data, userId },
            update: data,
        });
    }
    async delete(userId) {
        return database_1.default.subscription.delete({
            where: { userId },
        });
    }
    async countWallets(userId) {
        return database_1.default.wallet.count({ where: { userId } });
    }
    async countTransactions(userId) {
        return database_1.default.transaction.count({ where: { userId } });
    }
    async countRecurrences(userId) {
        return database_1.default.recurrence.count({ where: { userId } });
    }
    async countGoals(userId) {
        return database_1.default.goal.count({ where: { userId } });
    }
    async countInstallments(userId) {
        return database_1.default.installment.count({ where: { userId } });
    }
    async countBudgets(userId) {
        return database_1.default.budget.count({ where: { userId } });
    }
}
exports.SubscriptionRepository = SubscriptionRepository;
exports.subscriptionRepository = new SubscriptionRepository();
//# sourceMappingURL=subscription.repository.js.map