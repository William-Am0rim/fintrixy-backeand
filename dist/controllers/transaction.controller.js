"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.remove = exports.update = exports.create = exports.getRecent = exports.getById = exports.getAll = void 0;
const transaction_service_1 = require("../services/transaction.service");
const helpers_1 = require("../utils/helpers");
exports.getAll = (0, helpers_1.catchAsync)(async (req, res) => {
    const transactions = await transaction_service_1.transactionService.getAll(req.user.id, req.query);
    res.json({ success: true, data: transactions });
});
exports.getById = (0, helpers_1.catchAsync)(async (req, res) => {
    const transaction = await transaction_service_1.transactionService.getById(req.params.id, req.user.id);
    res.json({ success: true, data: transaction });
});
exports.getRecent = (0, helpers_1.catchAsync)(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const transactions = await transaction_service_1.transactionService.getRecent(req.user.id, limit);
    res.json({ success: true, data: transactions });
});
exports.create = (0, helpers_1.catchAsync)(async (req, res) => {
    console.log("Transaction controller - user:", req.user);
    console.log("Transaction controller - body:", req.body);
    const transaction = await transaction_service_1.transactionService.create(req.user.id, req.body);
    res.status(201).json({ success: true, message: "Transaction created successfully", data: transaction });
});
exports.update = (0, helpers_1.catchAsync)(async (req, res) => {
    const transaction = await transaction_service_1.transactionService.update(req.params.id, req.user.id, req.body);
    res.json({ success: true, message: "Transaction updated successfully", data: transaction });
});
exports.remove = (0, helpers_1.catchAsync)(async (req, res) => {
    await transaction_service_1.transactionService.delete(req.params.id, req.user.id);
    res.json({ success: true, message: "Transaction deleted successfully" });
});
exports.getStats = (0, helpers_1.catchAsync)(async (req, res) => {
    const stats = await transaction_service_1.transactionService.getStats(req.user.id, req.query);
    res.json({ success: true, data: stats });
});
//# sourceMappingURL=transaction.controller.js.map