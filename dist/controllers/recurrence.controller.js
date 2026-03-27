"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpcoming = exports.getStats = exports.skipNext = exports.processNow = exports.toggleActive = exports.remove = exports.update = exports.create = exports.getInactive = exports.getActive = exports.getById = exports.getAll = void 0;
const recurrence_service_1 = require("../services/recurrence.service");
const helpers_1 = require("../utils/helpers");
exports.getAll = (0, helpers_1.catchAsync)(async (req, res) => {
    const recurrences = await recurrence_service_1.recurrenceService.getAll(req.user.id);
    res.json({ success: true, data: recurrences });
});
exports.getById = (0, helpers_1.catchAsync)(async (req, res) => {
    const recurrence = await recurrence_service_1.recurrenceService.getById(req.params.id, req.user.id);
    res.json({ success: true, data: recurrence });
});
exports.getActive = (0, helpers_1.catchAsync)(async (req, res) => {
    const recurrences = await recurrence_service_1.recurrenceService.getActive(req.user.id);
    res.json({ success: true, data: recurrences });
});
exports.getInactive = (0, helpers_1.catchAsync)(async (req, res) => {
    const recurrences = await recurrence_service_1.recurrenceService.getInactive(req.user.id);
    res.json({ success: true, data: recurrences });
});
exports.create = (0, helpers_1.catchAsync)(async (req, res) => {
    const recurrence = await recurrence_service_1.recurrenceService.create(req.user.id, req.body);
    res.status(201).json({ success: true, message: "Recurrence created successfully", data: recurrence });
});
exports.update = (0, helpers_1.catchAsync)(async (req, res) => {
    const recurrence = await recurrence_service_1.recurrenceService.update(req.params.id, req.user.id, req.body);
    res.json({ success: true, message: "Recurrence updated successfully", data: recurrence });
});
exports.remove = (0, helpers_1.catchAsync)(async (req, res) => {
    await recurrence_service_1.recurrenceService.delete(req.params.id, req.user.id);
    res.json({ success: true, message: "Recurrence deleted successfully" });
});
exports.toggleActive = (0, helpers_1.catchAsync)(async (req, res) => {
    const recurrence = await recurrence_service_1.recurrenceService.toggleActive(req.params.id, req.user.id);
    res.json({ success: true, message: "Recurrence toggled successfully", data: recurrence });
});
exports.processNow = (0, helpers_1.catchAsync)(async (req, res) => {
    const recurrence = await recurrence_service_1.recurrenceService.processNow(req.params.id, req.user.id);
    res.json({ success: true, message: "Recurrence processed successfully", data: recurrence });
});
exports.skipNext = (0, helpers_1.catchAsync)(async (req, res) => {
    const recurrence = await recurrence_service_1.recurrenceService.skipNext(req.params.id, req.user.id);
    res.json({ success: true, message: "Next occurrence skipped successfully", data: recurrence });
});
exports.getStats = (0, helpers_1.catchAsync)(async (req, res) => {
    const stats = await recurrence_service_1.recurrenceService.getStats(req.user.id);
    res.json({ success: true, data: stats });
});
exports.getUpcoming = (0, helpers_1.catchAsync)(async (req, res) => {
    const days = parseInt(req.query.days) || 7;
    const recurrences = await recurrence_service_1.recurrenceService.getUpcoming(req.user.id, days);
    res.json({ success: true, data: recurrences });
});
//# sourceMappingURL=recurrence.controller.js.map