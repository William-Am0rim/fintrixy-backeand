"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const wallet_routes_1 = __importDefault(require("./wallet.routes"));
const transaction_routes_1 = __importDefault(require("./transaction.routes"));
const goal_routes_1 = __importDefault(require("./goal.routes"));
const budget_routes_1 = __importDefault(require("./budget.routes"));
const installment_routes_1 = __importDefault(require("./installment.routes"));
const recurrence_routes_1 = __importDefault(require("./recurrence.routes"));
const subscription_routes_1 = __importDefault(require("./subscription.routes"));
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.default);
router.use("/wallets", wallet_routes_1.default);
router.use("/transactions", transaction_routes_1.default);
router.use("/goals", goal_routes_1.default);
router.use("/budgets", budget_routes_1.default);
router.use("/installments", installment_routes_1.default);
router.use("/recurrences", recurrence_routes_1.default);
router.use("/subscription", subscription_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map