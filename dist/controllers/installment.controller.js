"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverdue = exports.getUpcoming = exports.getStats = exports.payInstallment = exports.remove = exports.update = exports.create = exports.getCompleted = exports.getActive = exports.getById = exports.getAll = void 0;
const installment_service_1 = require("../services/installment.service");
const helpers_1 = require("../utils/helpers");
exports.getAll = (0, helpers_1.catchAsync)(async (req, res) => {
    const installments = await installment_service_1.installmentService.getAll(req.user.id);
    res.json({ success: true, data: installments });
});
exports.getById = (0, helpers_1.catchAsync)(async (req, res) => {
    const installment = await installment_service_1.installmentService.getById(req.params.id, req.user.id);
    res.json({ success: true, data: installment });
});
exports.getActive = (0, helpers_1.catchAsync)(async (req, res) => {
    const installments = await installment_service_1.installmentService.getActive(req.user.id);
    res.json({ success: true, data: installments });
});
exports.getCompleted = (0, helpers_1.catchAsync)(async (req, res) => {
    const installments = await installment_service_1.installmentService.getCompleted(req.user.id);
    res.json({ success: true, data: installments });
});
exports.create = (0, helpers_1.catchAsync)(async (req, res) => {
    const installment = await installment_service_1.installmentService.create(req.user.id, req.body);
    res.status(201).json({ success: true, message: "Installment created successfully", data: installment });
});
exports.update = (0, helpers_1.catchAsync)(async (req, res) => {
    const installment = await installment_service_1.installmentService.update(req.params.id, req.user.id, req.body);
    res.json({ success: true, message: "Installment updated successfully", data: installment });
});
exports.remove = (0, helpers_1.catchAsync)(async (req, res) => {
    await installment_service_1.installmentService.delete(req.params.id, req.user.id);
    res.json({ success: true, message: "Installment deleted successfully" });
});
exports.payInstallment = (0, helpers_1.catchAsync)(async (req, res) => {
    const { amount } = req.body;
    const installment = await installment_service_1.installmentService.payInstallment(req.params.id, req.user.id, amount);
    res.json({ success: true, message: "Installment paid successfully", data: installment });
});
exports.getStats = (0, helpers_1.catchAsync)(async (req, res) => {
    const stats = await installment_service_1.installmentService.getStats(req.user.id);
    res.json({ success: true, data: stats });
});
exports.getUpcoming = (0, helpers_1.catchAsync)(async (req, res) => {
    const days = parseInt(req.query.days) || 7;
    const installments = await installment_service_1.installmentService.getUpcoming(req.user.id, days);
    res.json({ success: true, data: installments });
});
exports.getOverdue = (0, helpers_1.catchAsync)(async (req, res) => {
    const installments = await installment_service_1.installmentService.getOverdue(req.user.id);
    res.json({ success: true, data: installments });
});
//# sourceMappingURL=installment.controller.js.map