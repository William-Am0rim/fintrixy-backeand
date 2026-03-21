import { Router } from "express";
import authRoutes from "./auth.routes";
import walletRoutes from "./wallet.routes";
import transactionRoutes from "./transaction.routes";
import goalRoutes from "./goal.routes";
import budgetRoutes from "./budget.routes";
import installmentRoutes from "./installment.routes";
import recurrenceRoutes from "./recurrence.routes";
import subscriptionRoutes from "./subscription.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/wallets", walletRoutes);
router.use("/transactions", transactionRoutes);
router.use("/goals", goalRoutes);
router.use("/budgets", budgetRoutes);
router.use("/installments", installmentRoutes);
router.use("/recurrences", recurrenceRoutes);
router.use("/subscription", subscriptionRoutes);

export default router;
