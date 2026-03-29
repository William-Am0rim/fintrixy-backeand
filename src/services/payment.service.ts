import { config } from "../config";
import prisma from "../config/database";

const ABACATEPAY_API_URL = "https://api.abacatepay.com/v1";

export interface PaymentResult {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}

export const paymentService = {
  async createPixCharge(amount: number, userId: string, plan: string): Promise<PaymentResult> {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      
      if (!user) {
        return { success: false, error: "Usuário não encontrado" };
      }

      const response = await fetch(`${ABACATEPAY_API_URL}/billings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${config.abacatepay.apiKey}`,
        },
        body: JSON.stringify({
          frequency: "ONE_TIME",
          methods: ["PIX"],
          products: [
            {
              externalId: `PLAN-${plan.toUpperCase()}`,
              name: `Plano ${plan} - Fintrixy`,
              quantity: 1,
              price: Math.round(amount * 100),
            },
          ],
          returnUrl: `${config.cors.frontendUrl}/plans?success=true`,
          completionUrl: `${config.cors.frontendUrl}/plans?success=true`,
          customer: {
            name: user.name,
            email: user.email,
          },
          metadata: {
            userId,
            plan,
          },
        }),
      });

      const data = await response.json() as any;

      if (!response.ok) {
        return { success: false, error: data.message || "Erro ao criar cobrança" };
      }

      return { success: true, data };
    } catch (error: any) {
      console.error("Erro ao criar cobrança PIX:", error);
      return { success: false, error: error.message || "Erro ao criar cobrança" };
    }
  },

  async getPaymentStatus(billingId: string): Promise<PaymentResult> {
    try {
      const response = await fetch(`${ABACATEPAY_API_URL}/billings/${billingId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${config.abacatepay.apiKey}`,
        },
      });

      const data = await response.json() as any;

      if (!response.ok) {
        return { success: false, error: data.message || "Erro ao verificar pagamento" };
      }

      return { success: true, data };
    } catch (error: any) {
      console.error("Erro ao verificar pagamento:", error);
      return { success: false, error: error.message || "Erro ao verificar pagamento" };
    }
  },

  async processWebhook(payload: any): Promise<{ success: boolean; error?: string }> {
    try {
      const { event, data } = payload;

      if (event === "payment.completed" || event === "billing.paid") {
        const metadata = data.metadata || {};
        const userId = metadata.userId;
        const plan = metadata.plan;

        if (userId && plan) {
          await prisma.subscription.upsert({
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
    } catch (error: any) {
      console.error("Erro ao processar webhook:", error);
      return { success: false, error: error.message };
    }
  },
};
