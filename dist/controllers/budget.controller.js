"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExceeded = exports.getStats = exports.resetSpent = exports.updateSpent = exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const budget_service_1 = require("../services/budget.service");
const helpers_1 = require("../utils/helpers");
exports.getAll = (0, helpers_1.catchAsync)(async (req, res) => {
    const budgets = await budget_service_1.budgetService.getAll(req.user.id);
    res.json({ success: true, data: budgets });
});
exports.getById = (0, helpers_1.catchAsync)(async (req, res) => {
    const budget = await budget_service_1.budgetService.getById(req.params.id, req.user.id);
    res.json({ success: true, data: budget });
});
exports.create = (0, helpers_1.catchAsync)(async (req, res) => {
    const budget = await budget_service_1.budgetService.create(req.user.id, req.body);
    res.status(201).json({ success: true, message: "Budget created successfully", data: budget });
});
exports.update = (0, helpers_1.catchAsync)(async (req, res) => {
    const budget = await budget_service_1.budgetService.update(req.params.id, req.user.id, req.body);
    res.json({ success: true, message: "Budget updated successfully", data: budget });
});
exports.remove = (0, helpers_1.catchAsync)(async (req, res) => {
    await budget_service_1.budgetService.delete(req.params.id, req.user.id);
    res.json({ success: true, message: "Budget deleted successfully" });
});
exports.updateSpent = (0, helpers_1.catchAsync)(async (req, res) => {
    const { amount } = req.body;
    const budget = await budget_service_1.budgetService.updateSpent(req.params.id, req.user.id, amount);
    res.json({ success: true, message: "Spent updated successfully", data: budget });
});
exports.resetSpent = (0, helpers_1.catchAsync)(async (req, res) => {
    const budget = await budget_service_1.budgetService.resetSpent(req.params.id, req.user.id);
    res.json({ success: true, message: "Spent reset successfully", data: budget });
});
exports.getStats = (0, helpers_1.catchAsync)(async (req, res) => {
    const stats = await budget_service_1.budgetService.getStats(req.user.id);
    res.json({ success: true, data: stats });
});
exports.getExceeded = (0, helpers_1.catchAsync)(async (req, res) => {
    const budgets = await budget_service_1.budgetService.getExceeded(req.user.id);
    res.json({ success: true, data: budgets });
});
//# sourceMappingURL=budget.controller.js.map