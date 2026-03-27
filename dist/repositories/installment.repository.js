"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installmentRepository = exports.InstallmentRepository = void 0;
const database_1 = __importDefault(require("../config/database"));
class InstallmentRepository {
    async findAll(userId) {
        return database_1.default.installment.findMany({ where: { userId }, orderBy: { nextDueDate: "asc" } });
    }
    async findById(id, userId) {
        return database_1.default.installment.findFirst({ where: { id, userId } });
    }
    async findActive(userId) {
        return database_1.default.installment.findMany({
            where: { userId, completed: false },
            orderBy: { nextDueDate: "asc" },
        });
    }
    async findCompleted(userId) {
        return database_1.default.installment.findMany({
            where: { userId, completed: true },
            orderBy: { updatedAt: "desc" },
        });
    }
    async create(data) {
        const { startDate, ...rest } = data;
        console.log("Installment repository - creating with:", { startDate, ...rest });
        return database_1.default.installment.create({
            data: {
                ...rest,
                nextDueDate: startDate ? new Date(startDate) : new Date(),
                paidValue: 0,
                paidInstallments: 0,
            },
        });
    }
    async update(id, data) {
        const updateData = { ...data };
        if (data.startDate) {
            updateData.nextDueDate = new Date(data.startDate);
            delete updateData.startDate;
        }
        return database_1.default.installment.update({ where: { id }, data: updateData });
    }
    async delete(id) {
        return database_1.default.installment.delete({ where: { id } });
    }
    async payInstallment(id, amount) {
        const installment = await database_1.default.installment.findUnique({ where: { id } });
        if (!installment) {
            throw new Error("Installment not found");
        }
        const installmentValue = installment.totalValue / installment.totalInstallments;
        const paymentAmount = amount || installmentValue;
        const newPaidValue = installment.paidValue + paymentAmount;
        const newPaidInstallments = installment.paidInstallments + 1;
        const completed = newPaidInstallments >= installment.totalInstallments;
        let nextDate = null;
        if (!completed) {
            nextDate = new Date(installment.nextDueDate);
            nextDate.setMonth(nextDate.getMonth() + 1);
        }
        return database_1.default.installment.update({
            where: { id },
            data: {
                paidValue: Math.min(newPaidValue, installment.totalValue),
                paidInstallments: newPaidInstallments,
                nextDueDate: nextDate ?? undefined,
                completed,
            },
        });
    }
    async getStats(userId) {
        const installments = await database_1.default.installment.findMany({ where: { userId } });
        const active = installments.filter((i) => !i.completed);
        const completed = installments.filter((i) => i.completed);
        const totalRemaining = active.reduce((sum, i) => sum + (i.totalValue - i.paidValue), 0);
        const totalPaid = installments.reduce((sum, i) => sum + i.paidValue, 0);
        return {
            total: installments.length,
            active: active.length,
            completed: completed.length,
            totalRemaining,
            totalPaid,
            averageInstallment: active.length > 0 ? totalRemaining / active.reduce((sum, i) => sum + (i.totalInstallments - i.paidInstallments), 0) : 0,
        };
    }
    async getUpcoming(userId, days = 7) {
        const now = new Date();
        const future = new Date();
        future.setDate(future.getDate() + days);
        return database_1.default.installment.findMany({
            where: { userId, completed: false, nextDueDate: { gte: now, lte: future } },
            orderBy: { nextDueDate: "asc" },
        });
    }
    async getOverdue(userId) {
        return database_1.default.installment.findMany({
            where: { userId, completed: false, nextDueDate: { lt: new Date() } },
            orderBy: { nextDueDate: "asc" },
        });
    }
}
exports.InstallmentRepository = InstallmentRepository;
exports.installmentRepository = new InstallmentRepository();
//# sourceMappingURL=installment.repository.js.map