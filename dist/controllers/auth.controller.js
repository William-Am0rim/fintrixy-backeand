"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateProfile = exports.getProfile = exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const helpers_1 = require("../utils/helpers");
exports.register = (0, helpers_1.catchAsync)(async (req, res) => {
    const result = await auth_service_1.authService.register(req.body);
    res.status(201).json({ success: true, message: "User registered successfully", data: result });
});
exports.login = (0, helpers_1.catchAsync)(async (req, res) => {
    const result = await auth_service_1.authService.login(req.body);
    res.json({ success: true, message: "Login successful", data: result });
});
exports.getProfile = (0, helpers_1.catchAsync)(async (req, res) => {
    const user = await auth_service_1.authService.getProfile(req.user.id);
    res.json({ success: true, data: user });
});
exports.updateProfile = (0, helpers_1.catchAsync)(async (req, res) => {
    const user = await auth_service_1.authService.updateProfile(req.user.id, req.body);
    res.json({ success: true, message: "Profile updated successfully", data: user });
});
exports.changePassword = (0, helpers_1.catchAsync)(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const result = await auth_service_1.authService.changePassword(req.user.id, currentPassword, newPassword);
    res.json({ success: true, data: result });
});
//# sourceMappingURL=auth.controller.js.map