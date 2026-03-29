"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPayment = exports.checkLimit = exports.getStats = exports.downgradeToFree = exports.upgradeToPro = exports.getPlanLimits = exports.getSubscription = void 0;
const subscription_service_1 = require("../services/subscription.service");
const helpers_1 = require("../utils/helpers");
exports.getSubscription = (0, helpers_1.catchAsync)(async (req, res) => {
    const userId = req.user.id;
    const subscription = await subscription_service_1.subscriptionService.getSubscription(userId);
    res.json({ success: true, data: subscription });
});
exports.getPlanLimits = (0, helpers_1.catchAsync)(async (req, res) => {
    const userId = req.user.id;
    const limits = await subscription_service_1.subscriptionService.getPlanLimits(userId);
    res.json({ success: true, data: limits });
});
exports.upgradeToPro = (0, helpers_1.catchAsync)(async (req, res) => {
    const userId = req.user.id;
    const subscription = await subscription_service_1.subscriptionService.upgradeToPro(userId, req.body);
    res.json({ success: true, data: subscription });
});
exports.downgradeToFree = (0, helpers_1.catchAsync)(async (req, res) => {
    const userId = req.user.id;
    const subscription = await subscription_service_1.subscriptionService.downgradeToFree(userId);
    res.json({ success: true, data: subscription });
});
exports.getStats = (0, helpers_1.catchAsync)(async (req, res) => {
    const userId = req.user.id;
    const stats = await subscription_service_1.subscriptionService.getStats(userId);
    res.json({ success: true, data: stats });
});
exports.checkLimit = (0, helpers_1.catchAsync)(async (req, res) => {
    const userId = req.user.id;
    const { type } = req.query;
    if (!type || !["wallets", "transactions", "recurrences", "goals", "installments", "budgets"].includes(type)) {
        return res.status(400).json({
            success: false,
            error: "Tipo inválido. Use: wallets, transactions, recurrences, goals, installments, budgets"
        });
    }
    const result = await subscription_service_1.subscriptionService.checkLimit(userId, type);
    res.json({ success: true, data: result });
});
exports.confirmPayment = (0, helpers_1.catchAsync)(async (req, res) => {
    const userId = req.user.id;
    const { billingId } = req.body;
    if (!billingId) {
        return res.status(400).json({
            success: false,
            error: "billingId é obrigatório"
        });
    }
    const subscription = await subscription_service_1.subscriptionService.confirmPayment(userId, billingId);
    res.json({ success: true, data: subscription });
});
//# sourceMappingURL=subscription.controller.js.map