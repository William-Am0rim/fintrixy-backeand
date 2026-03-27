"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBalance = exports.getStats = exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const wallet_service_1 = require("../services/wallet.service");
const helpers_1 = require("../utils/helpers");
exports.getAll = (0, helpers_1.catchAsync)(async (req, res) => {
    const wallets = await wallet_service_1.walletService.getAll(req.user.id);
    res.json({ success: true, data: wallets });
});
exports.getById = (0, helpers_1.catchAsync)(async (req, res) => {
    const wallet = await wallet_service_1.walletService.getById(req.params.id, req.user.id);
    res.json({ success: true, data: wallet });
});
exports.create = (0, helpers_1.catchAsync)(async (req, res) => {
    const wallet = await wallet_service_1.walletService.create(req.user.id, req.body);
    res.status(201).json({ success: true, message: "Wallet created successfully", data: wallet });
});
exports.update = (0, helpers_1.catchAsync)(async (req, res) => {
    const wallet = await wallet_service_1.walletService.update(req.params.id, req.user.id, req.body);
    res.json({ success: true, message: "Wallet updated successfully", data: wallet });
});
exports.remove = (0, helpers_1.catchAsync)(async (req, res) => {
    await wallet_service_1.walletService.delete(req.params.id, req.user.id);
    res.json({ success: true, message: "Wallet deleted successfully" });
});
exports.getStats = (0, helpers_1.catchAsync)(async (req, res) => {
    const stats = await wallet_service_1.walletService.getStats(req.user.id);
    res.json({ success: true, data: stats });
});
exports.updateBalance = (0, helpers_1.catchAsync)(async (req, res) => {
    const { amount, type } = req.body;
    const wallet = await wallet_service_1.walletService.updateBalance(req.params.id, req.user.id, amount, type);
    res.json({ success: true, message: "Balance updated successfully", data: wallet });
});
//# sourceMappingURL=wallet.controller.js.map