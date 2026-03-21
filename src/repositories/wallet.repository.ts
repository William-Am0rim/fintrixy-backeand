import prisma from "../config/database";
import { Wallet } from "@prisma/client";

export interface CreateWalletData {
  name: string;
  type: string;
  balance?: number;
  color: string;
  icon?: string;
  userId: string;
}

export interface UpdateWalletData {
  name?: string;
  type?: string;
  balance?: number;
  color?: string;
  icon?: string | null;
}

export interface WalletStats {
  total: number;
  count: number;
  totalIncome: number;
  totalExpense: number;
  byType: { type: string; count: number; total: number }[];
}

export class WalletRepository {
  async findAll(userId: string): Promise<Wallet[]> {
    return prisma.wallet.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string, userId: string): Promise<Wallet | null> {
    return prisma.wallet.findFirst({
      where: { id, userId },
    });
  }

  async create(data: CreateWalletData): Promise<Wallet> {
    return prisma.wallet.create({
      data,
    });
  }

  async update(id: string, data: UpdateWalletData): Promise<Wallet> {
    return prisma.wallet.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Wallet> {
    return prisma.wallet.delete({
      where: { id },
    });
  }

  async updateBalance(id: string, amount: number, type: "add" | "subtract"): Promise<Wallet> {
    const wallet = await prisma.wallet.findUnique({ where: { id } });
    if (!wallet) throw new Error("Wallet not found");

    const newBalance = type === "add" ? wallet.balance + amount : wallet.balance - amount;

    return prisma.wallet.update({
      where: { id },
      data: { balance: newBalance },
    });
  }

  async getStats(userId: string): Promise<WalletStats> {
    const wallets = await prisma.wallet.findMany({
      where: { userId },
    });

    const total = wallets.reduce((sum, w) => sum + w.balance, 0);
    const positive = wallets.filter((w) => w.balance > 0).reduce((sum, w) => sum + w.balance, 0);
    const negative = wallets.filter((w) => w.balance < 0).reduce((sum, w) => sum + Math.abs(w.balance), 0);

    const byType = wallets.reduce((acc: { type: string; count: number; total: number }[], w) => {
      const existing = acc.find((t) => t.type === w.type);
      if (existing) {
        existing.count += 1;
        existing.total += w.balance;
      } else {
        acc.push({ type: w.type, count: 1, total: w.balance });
      }
      return acc;
    }, []);

    return { total, count: wallets.length, totalIncome: positive, totalExpense: negative, byType };
  }
}

export const walletRepository = new WalletRepository();
