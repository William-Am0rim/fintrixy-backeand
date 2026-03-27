"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../repositories/user.repository");
const config_1 = require("../config");
const error_middleware_1 = require("../middlewares/error.middleware");
const database_1 = __importDefault(require("../config/database"));
class AuthService {
    async register(data) {
        const existingUser = await user_repository_1.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new error_middleware_1.AppError("Email already registered", 400);
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 12);
        const user = await user_repository_1.userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });
        if (!user || !user.id) {
            throw new error_middleware_1.AppError("Failed to create user", 500);
        }
        const token = this.generateToken(user.id);
        return { user: user, token };
    }
    async login(data) {
        const user = await user_repository_1.userRepository.findByEmail(data.email);
        if (!user) {
            throw new error_middleware_1.AppError("Invalid credentials", 401);
        }
        const isPasswordValid = await bcryptjs_1.default.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new error_middleware_1.AppError("Invalid credentials", 401);
        }
        const token = this.generateToken(user.id);
        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
    async getProfile(userId) {
        const user = await user_repository_1.userRepository.findById(userId);
        if (!user) {
            throw new error_middleware_1.AppError("User not found", 404);
        }
        return user;
    }
    async updateProfile(userId, data) {
        const user = await user_repository_1.userRepository.update(userId, data);
        if (!user) {
            throw new error_middleware_1.AppError("User not found", 404);
        }
        return user;
    }
    async changePassword(userId, currentPassword, newPassword) {
        const foundUser = await user_repository_1.userRepository.findById(userId);
        if (!foundUser || !foundUser.email) {
            throw new error_middleware_1.AppError("User not found", 404);
        }
        const user = await user_repository_1.userRepository.findByEmail(foundUser.email);
        if (!user) {
            throw new error_middleware_1.AppError("User not found", 404);
        }
        const isPasswordValid = await bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new error_middleware_1.AppError("Current password is incorrect", 400);
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 12);
        await database_1.default.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
        return { message: "Password changed successfully" };
    }
    generateToken(userId) {
        return jsonwebtoken_1.default.sign({ id: userId }, config_1.config.jwt.secret, { expiresIn: "7d" });
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map