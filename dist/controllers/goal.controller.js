"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverdue = exports.getStats = exports.addContribution = exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const goal_service_1 = require("../services/goal.service");
const helpers_1 = require("../utils/helpers");
exports.getAll = (0, helpers_1.catchAsync)(async (req, res) => {
    const goals = await goal_service_1.goalService.getAll(req.user.id);
    res.json({ success: true, data: goals });
});
exports.getById = (0, helpers_1.catchAsync)(async (req, res) => {
    const goal = await goal_service_1.goalService.getById(req.params.id, req.user.id);
    res.json({ success: true, data: goal });
});
exports.create = (0, helpers_1.catchAsync)(async (req, res) => {
    const goal = await goal_service_1.goalService.create(req.user.id, req.body);
    res.status(201).json({ success: true, message: "Goal created successfully", data: goal });
});
exports.update = (0, helpers_1.catchAsync)(async (req, res) => {
    const goal = await goal_service_1.goalService.update(req.params.id, req.user.id, req.body);
    res.json({ success: true, message: "Goal updated successfully", data: goal });
});
exports.remove = (0, helpers_1.catchAsync)(async (req, res) => {
    await goal_service_1.goalService.delete(req.params.id, req.user.id);
    res.json({ success: true, message: "Goal deleted successfully" });
});
exports.addContribution = (0, helpers_1.catchAsync)(async (req, res) => {
    const { amount } = req.body;
    const goal = await goal_service_1.goalService.addContribution(req.params.id, req.user.id, amount);
    res.json({ success: true, message: "Contribution added successfully", data: goal });
});
exports.getStats = (0, helpers_1.catchAsync)(async (req, res) => {
    const stats = await goal_service_1.goalService.getStats(req.user.id);
    res.json({ success: true, data: stats });
});
exports.getOverdue = (0, helpers_1.catchAsync)(async (req, res) => {
    const goals = await goal_service_1.goalService.getOverdue(req.user.id);
    res.json({ success: true, data: goals });
});
//# sourceMappingURL=goal.controller.js.map