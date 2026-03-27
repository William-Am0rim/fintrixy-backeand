"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionService = exports.SubscriptionService = exports.PLAN_LIMITS = void 0;
const subscription_repository_1 = require("../repositories/subscription.repository");
const error_middleware_1 = require("../middlewares/error.middleware");
exports.PLAN_LIMITS = {
    free: {
        wallets: 1,
        transactions: 10,
        recurrences: 5,
        goals: 5,
        installments: 5,
        budgets: 5,
    },
    pro: {
        wallets: Infinity,
        transactions: Infinity,
        recurrences: Infinity,
        goals: Infinity,
        installments: Infinity,
        budgets: Infinity,
    },
};
class SubscriptionService {
    async getSubscription(userId) {
        let subscription = await subscription_repository_1.subscriptionRepository.findByUserId(userId);
        if (!subscription) {
            subscription = await subscription_repository_1.subscriptionRepository.create(userId, {
                plan: "free",
                status: "active",
            });
        }
        return subscription;
    }
    async getPlanLimits(userId) {
        const subscription = await this.getSubscription(userId);
        const plan = subscription.plan;
        return {
            plan,
            limits: exports.PLAN_LIMITS[plan] || exports.PLAN_LIMITS.free,
        };
    }
    async checkLimit(userId, type) {
        const { plan, limits } = await this.getPlanLimits(userId);
        if (plan === "pro") {
            return { allowed: true, plan };
        }
        const counts = {
            wallets: await subscription_repository_1.subscriptionRepository.countWallets(userId),
            transactions: await subscription_repository_1.subscriptionRepository.countTransactions(userId),
            recurrences: await subscription_repository_1.subscriptionRepository.countRecurrences(userId),
            goals: await subscription_repository_1.subscriptionRepository.countGoals(userId),
            installments: await subscription_repository_1.subscriptionRepository.countInstallments(userId),
            budgets: await subscription_repository_1.subscriptionRepository.countBudgets(userId),
        };
        const currentCount = counts[type];
        const limit = limits[type];
        if (currentCount >= limit) {
            return {
                allowed: false,
                plan,
                current: currentCount,
                limit,
                type,
            };
        }
        return { allowed: true, plan, current: currentCount, limit };
    }
    async upgradeToPro(userId, paymentData) {
        const subscription = await this.getSubscription(userId);
        if (subscription.plan === "pro") {
            throw new error_middleware_1.AppError("Você já possui o plano Pro", 400);
        }
        return subscription_repository_1.subscriptionRepository.upsert(userId, {
            plan: "pro",
            status: "active",
            paymentMethod: paymentData?.paymentMethod || "pix",
            transactionId: paymentData?.transactionId || `PRO-${Date.now()}`,
            startDate: new Date(),
            endDate: null,
        });
    }
    async downgradeToFree(userId) {
        return subscription_repository_1.subscriptionRepository.upsert(userId, {
            plan: "free",
            status: "active",
            endDate: new Date(),
        });
    }
    async getStats(userId) {
        const [subscription, wallets, transactions, recurrences, goals, installments, budgets] = await Promise.all([
            this.getSubscription(userId),
            subscription_repository_1.subscriptionRepository.countWallets(userId),
            subscription_repository_1.subscriptionRepository.countTransactions(userId),
            subscription_repository_1.subscriptionRepository.countRecurrences(userId),
            subscription_repository_1.subscriptionRepository.countGoals(userId),
            subscription_repository_1.subscriptionRepository.countInstallments(userId),
            subscription_repository_1.subscriptionRepository.countBudgets(userId),
        ]);
        const limits = exports.PLAN_LIMITS[subscription.plan] || exports.PLAN_LIMITS.free;
        return {
            plan: subscription.plan,
            status: subscription.status,
            stats: {
                wallets: { current: wallets, limit: limits.wallets },
                transactions: { current: transactions, limit: limits.transactions },
                recurrences: { current: recurrences, limit: limits.recurrences },
                goals: { current: goals, limit: limits.goals },
                installments: { current: installments, limit: limits.installments },
                budgets: { current: budgets, limit: limits.budgets },
            },
        };
    }
}
exports.SubscriptionService = SubscriptionService;
exports.subscriptionService = new SubscriptionService();
//# sourceMappingURL=subscription.service.js.map