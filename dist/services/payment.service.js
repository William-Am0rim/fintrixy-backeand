"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const config_1 = require("../config");
const database_1 = __importDefault(require("../config/database"));
const ABACATEPAY_API_URL = "https://api.abacatepay.com/v1";
exports.paymentService = {
    async createPixCharge(amount, userId, plan) {
        try {
            const user = await database_1.default.user.findUnique({ where: { id: userId } });
            if (!user) {
                return { success: false, error: "Usuário não encontrado" };
            }
            console.log("Criando cobrança com API key:", config_1.config.abacatepay.apiKey ? `Presente - ${config_1.config.abacatepay.apiKey.substring(0, 10)}...` : "Ausente");
            const response = await fetch(`${ABACATEPAY_API_URL}/pixQrCode/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${config_1.config.abacatepay.apiKey}`,
                },
                body: JSON.stringify({
                    amount: Math.round(amount * 100),
                    description: `Plano ${plan} - Fintrixy`,
                    expiresIn: 3600,
                }),
            });
            const data = await response.json();
            console.log("Resposta da AbacatePay:", response.status, data);
            if (!response.ok) {
                return { success: false, error: data.message || data.error || "Erro ao criar cobrança" };
            }
            return { success: true, data: data.data };
        }
        catch (error) {
            console.error("Erro ao criar cobrança PIX:", error);
            return { success: false, error: error.message || "Erro ao criar cobrança" };
        }
    },
    async getPaymentStatus(paymentId) {
        try {
            const response = await fetch(`${ABACATEPAY_API_URL}/pixQrCode/check/${paymentId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${config_1.config.abacatepay.apiKey}`,
                },
            });
            const data = await response.json();
            if (!response.ok) {
                return { success: false, error: data.message || "Erro ao verificar pagamento" };
            }
            return { success: true, data: data.data };
        }
        catch (error) {
            console.error("Erro ao verificar pagamento:", error);
            return { success: false, error: error.message || "Erro ao verificar pagamento" };
        }
    },
    async processWebhook(payload) {
        try {
            const { event, data } = payload;
            if (event === "payment.completed" || event === "billing.paid") {
                const metadata = data.metadata || {};
                const userId = metadata.userId;
                const plan = metadata.plan;
                if (userId && plan) {
                    await database_1.default.subscription.upsert({
                        where: { userId },
                        update: {
                            plan: "pro",
                            status: "active",
                            paymentMethod: "pix",
                            transactionId: data.id,
                        },
                        create: {
                            userId,
                            plan: "pro",
                            status: "active",
                            paymentMethod: "pix",
                            transactionId: data.id,
                        },
                    });
                }
            }
            return { success: true };
        }
        catch (error) {
            console.error("Erro ao processar webhook:", error);
            return { success: false, error: error.message };
        }
    },
};
//# sourceMappingURL=payment.service.js.map