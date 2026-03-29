import { subscriptionRepository } from "../repositories/subscription.repository";
import { paymentService } from "./payment.service";
import { AppError } from "../middlewares/error.middleware";

export const PLAN_PRICES = {
  pro: 10,
};

export const PLAN_LIMITS = {
  free: {
    wallets: 1,
    transactions: 10,
    recurrences: 5,
    goals: 5,
    installments: 5,
    budgets: 5,
  },
  pro: {
    wallets: Infinity,
    transactions: Infinity,
    recurrences: Infinity,
    goals: Infinity,
    installments: Infinity,
    budgets: Infinity,
  },
};

export class SubscriptionService {
  async getSubscription(userId: string) {
    let subscription = await subscriptionRepository.findByUserId(userId);
    
    if (!subscription) {
      subscription = await subscriptionRepository.create(userId, {
        plan: "free",
        status: "active",
      });
    }
    
    return subscription;
  }

  async getPlanLimits(userId: string) {
    const subscription = await this.getSubscription(userId);
    const plan = subscription.plan;
    
    return {
      plan,
      limits: PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.free,
    };
  }

  async checkLimit(userId: string, type: keyof typeof PLAN_LIMITS.free) {
    const { plan, limits } = await this.getPlanLimits(userId);
    
    if (plan === "pro") {
      return { allowed: true, plan };
    }
    
    const counts: Record<string, number> = {
      wallets: await subscriptionRepository.countWallets(userId),
      transactions: await subscriptionRepository.countTransactions(userId),
      recurrences: await subscriptionRepository.countRecurrences(userId),
      goals: await subscriptionRepository.countGoals(userId),
      installments: await subscriptionRepository.countInstallments(userId),
      budgets: await subscriptionRepository.countBudgets(userId),
    };
    
    const currentCount = counts[type];
    const limit = limits[type];
    
    if (currentCount >= limit) {
      return {
        allowed: false,
        plan,
        current: currentCount,
        limit,
        type,
      };
    }
    
    return { allowed: true, plan, current: currentCount, limit };
  }

  async upgradeToPro(userId: string, paymentData?: any) {
    const subscription = await this.getSubscription(userId);
    
    if (subscription.plan === "pro") {
      throw new AppError("Você já possui o plano Pro", 400);
    }

    const result = await paymentService.createPixCharge(PLAN_PRICES.pro, userId, "pro");
    
    if (!result.success) {
      throw new AppError(result.error || "Erro ao criar pagamento", 400);
    }

    return {
      paymentUrl: result.data.url,
      billingId: result.data.id,
    };
  }

  async confirmPayment(userId: string, billingId: string) {
    const result = await paymentService.getPaymentStatus(billingId);
    
    if (!result.success) {
      throw new AppError(result.error || "Erro ao verificar pagamento", 400);
    }

    const billing = result.data;
    
    if (billing.status === "PAID" || billing.status === "COMPLETED") {
      return subscriptionRepository.upsert(userId, {
        plan: "pro",
        status: "active",
        paymentMethod: "pix",
        transactionId: billingId,
        startDate: new Date(),
        endDate: null,
      });
    }

    throw new AppError("Pagamento ainda não foi confirmado", 400);
  }

  async downgradeToFree(userId: string) {
    return subscriptionRepository.upsert(userId, {
      plan: "free",
      status: "active",
      endDate: new Date(),
    });
  }

  async getStats(userId: string) {
    const [subscription, wallets, transactions, recurrences, goals, installments, budgets] = 
      await Promise.all([
        this.getSubscription(userId),
        subscriptionRepository.countWallets(userId),
        subscriptionRepository.countTransactions(userId),
        subscriptionRepository.countRecurrences(userId),
        subscriptionRepository.countGoals(userId),
        subscriptionRepository.countInstallments(userId),
        subscriptionRepository.countBudgets(userId),
      ]);
    
    const limits = PLAN_LIMITS[subscription.plan as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.free;
    
    return {
      plan: subscription.plan,
      status: subscription.status,
      stats: {
        wallets: { current: wallets, limit: limits.wallets },
        transactions: { current: transactions, limit: limits.transactions },
        recurrences: { current: recurrences, limit: limits.recurrences },
        goals: { current: goals, limit: limits.goals },
        installments: { current: installments, limit: limits.installments },
        budgets: { current: budgets, limit: limits.budgets },
      },
    };
  }
}

export const subscriptionService = new SubscriptionService();
