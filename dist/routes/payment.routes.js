"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const payment_service_1 = require("../services/payment.service");
const router = (0, express_1.Router)();
router.post("/create", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const { amount, plan } = req.body;
        const userId = req.user.id;
        const result = await payment_service_1.paymentService.createPixCharge(amount, userId, plan);
        if (result.success) {
            res.json({ success: true, data: result.data });
        }
        else {
            res.status(400).json({ success: false, message: result.error });
        }
    }
    catch (error) {
        console.error("Erro ao criar pagamento:", error);
        res.status(500).json({ success: false, message: "Erro ao criar pagamento" });
    }
});
router.get("/status/:billingId", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const { billingId } = req.params;
        const result = await payment_service_1.paymentService.getPaymentStatus(billingId);
        if (result.success) {
            res.json({ success: true, data: result.data });
        }
        else {
            res.status(400).json({ success: false, message: result.error });
        }
    }
    catch (error) {
        console.error("Erro ao verificar pagamento:", error);
        res.status(500).json({ success: false, message: "Erro ao verificar pagamento" });
    }
});
router.post("/webhook", async (req, res) => {
    try {
        const payload = req.body;
        const result = await payment_service_1.paymentService.processWebhook(payload);
        if (result.success) {
            res.json({ success: true });
        }
        else {
            res.status(400).json({ success: false, message: result.error });
        }
    }
    catch (error) {
        console.error("Erro ao processar webhook:", error);
        res.status(500).json({ success: false, message: "Erro ao processar webhook" });
    }
});
exports.default = router;
//# sourceMappingURL=payment.routes.js.map