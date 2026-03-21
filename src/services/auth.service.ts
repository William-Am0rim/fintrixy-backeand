import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository";
import { config } from "../config";
import { AppError } from "../middlewares/error.middleware";
import prisma from "../config/database";

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export interface AuthResponse {
  user: UserResponse;
  token: string;
}

export class AuthService {
  async register(data: { name: string; email: string; password: string }): Promise<AuthResponse> {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new AppError("Email already registered", 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    if (!user || !user.id) {
      throw new AppError("Failed to create user", 500);
    }

    const token = this.generateToken(user.id);
    return { user: user as UserResponse, token };
  }

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = this.generateToken(user.id);
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword as UserResponse, token };
  }

  async getProfile(userId: string): Promise<UserResponse> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user as UserResponse;
  }

  async updateProfile(userId: string, data: { name?: string; image?: string | null }): Promise<UserResponse> {
    const user = await userRepository.update(userId, data);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user as UserResponse;
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const foundUser = await userRepository.findById(userId);
    if (!foundUser || !foundUser.email) {
      throw new AppError("User not found", 404);
    }

    const user = await userRepository.findByEmail(foundUser.email);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new AppError("Current password is incorrect", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    return { message: "Password changed successfully" };
  }

  private generateToken(userId: string): string {
    return jwt.sign({ id: userId }, config.jwt.secret, { expiresIn: "7d" });
  }
}

export const authService = new AuthService();
